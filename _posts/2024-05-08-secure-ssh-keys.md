---
description: "Passwords are SSH's weakest link. Here's how to secure SSH keys end to end — generation, storage, rotation, and the risks nobody talks about."
layout: post
title: "How to Secure Your SSH Keys"
category: DevSecOps
tags: [SSH, Authentication, DevSecOps, Best Practices]
author: Marc
excerpt: "Passwords are SSH's weakest link. This guide covers how to secure SSH keys end to end — Ed25519 generation, hardware-backed storage, agent hygiene, rotation, and the silent risks (orphaned keys, embedded static keys, weak configurations) that cause most real-world SSH breaches."
image: /assets/img/posts/secure-ssh-keys.webp
image_width: 1200
image_height: 630
slug: secure-ssh-keys
last_modified_at: 2026-07-02
faq:
  - question: "Are SSH keys really more secure than passwords?"
    answer: "Yes. Passwords can be brute-forced, phished, or reused across sites; SSH keys are asymmetric cryptography with a private half that never leaves your machine. Even a fully compromised server can't retroactively pull your private key, and a strong passphrase adds a second factor at the endpoint."
  - question: "Should I use RSA or Ed25519 for SSH keys?"
    answer: "Use Ed25519 for anything new. It's faster than RSA, uses a much shorter key, resists side-channel attacks better, and has been standard in <a href=\"https://www.openssh.com/txt/release-6.5\">OpenSSH since version 6.5 in 2014</a>. Fall back to RSA-4096 only for legacy systems that predate Ed25519 support."
  - question: "How often should I rotate SSH keys?"
    answer: "Rotate personal keys at least annually, privileged production keys quarterly, and any key immediately after suspected compromise, laptop loss, or a team member leaving. <a href=\"https://csrc.nist.gov/pubs/sp/800/171/r3/final\">NIST SP 800-171</a> treats orphaned but present keys as an accountability failure — audit and rotate them like active credentials."
  - question: "What is an orphaned SSH key and why is it dangerous?"
    answer: "An orphaned key is a public key still authorized on a server whose owner is unknown or has left the company. It's a live backdoor: nobody notices when it's used, nobody rotates it, and it survives every access review. Audits routinely find them years after the person departed."
  - question: "Can SSH keys be stored on a hardware security key like YubiKey?"
    answer: "Yes. <a href=\"https://www.openssh.com/txt/release-8.2\">OpenSSH 8.2 and later</a> support FIDO2 hardware tokens through the <code>ed25519-sk</code> and <code>ecdsa-sk</code> key types. The private key material never leaves the token, physical touch is required per authentication, and remote key theft becomes effectively impossible."
---

*The default install gives you a false sense of security. Real SSH hygiene starts where the `ssh-keygen` tutorial ends.*

**TL;DR:** To secure SSH keys, generate Ed25519 keys with a strong passphrase, lock down file permissions, use the SSH agent for convenience, and store production keys on a hardware token. The bigger wins, though, come from what most tutorials skip: auditing `authorized_keys` for orphaned entries, killing shared and static keys, rotating on a schedule, and disabling password fallback on the server side.

---

**Jump to a section:**

- [Are SSH keys really more secure than passwords?](#why-ssh-keys)
- [How do you generate strong SSH keys?](#generation)
- [How do you protect the private key file?](#private-key-protection)
- [Should you use the SSH agent?](#ssh-agent)
- [How should you configure ~/.ssh/config for security?](#config)
- [What are the biggest real-world risks with SSH keys?](#ssh-key-risks)
- [How often should you rotate SSH keys?](#key-rotation)
- [Should you use a hardware security key for SSH?](#hardware-keys)
- [How do you audit SSH keys across your fleet?](#auditing)

SSH is the front door to production. It's also the control plane most people set up on a Friday afternoon and never revisit. In [Verizon's 2024 Data Breach Investigations Report](https://www.verizon.com/business/resources/articles/s/what-the-2024-dbir-tells-us-about-enterprise-cybersecurity-strategy/), the use of stolen credentials was the initial action in 24% of breaches and has been present in 31% of all breaches over the past decade. Keys don't eliminate that risk on their own — how you generate, store, distribute, and revoke them decides whether they're a fortress or a filing cabinet with the label "backdoors" taped to it.

## Are SSH keys really more secure than passwords? {#why-ssh-keys}

> **Direct answer:** Yes — when the private key is protected. Key auth replaces a shared secret you type with an asymmetric key pair, so the server never sees the private half. Brute-force, phishing, and credential-stuffing attacks lose their leverage.

Password-based SSH auth is a shared secret. Every login sends something the server has to compare against a stored hash, and every server that accepts your password gets a chance to log it, leak it, or hash it weakly. That's how credential stuffing works at scale — one breach anywhere becomes an attack everywhere.

Public-key authentication flips the model. Your server stores only a public key. Signing happens on your laptop with a private key that never crosses the wire. An attacker who owns the server can grant themselves access going forward, but they can't retroactively steal the key you already used to authenticate.

The passphrase on the private key is what makes this a real second factor: possession of the file plus knowledge of the passphrase. Skip the passphrase and you've reduced SSH auth to a bearer token sitting on disk.

## How do you generate strong SSH keys? {#generation}

> **Direct answer:** Use `ssh-keygen -t ed25519` for anything new. Ed25519 is faster, uses a shorter key, and has been the default recommendation in [OpenSSH since version 6.5](https://www.openssh.com/txt/release-6.5) in 2014. Fall back to RSA-4096 only when a legacy target refuses Ed25519.

### Ed25519 (recommended)

Ed25519 was formalized for SSH in [IETF RFC 8709](https://www.rfc-editor.org/rfc/rfc8709.html) after OpenSSH shipped it years earlier. It's a modern elliptic-curve signature scheme with a 256-bit key that's stronger and faster than any comparable RSA size:

```bash
# Generate an Ed25519 key with a descriptive comment
ssh-keygen -t ed25519 -C "you@example.com"

# Generate a work-specific key in its own file
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "work laptop $(date +%Y)"
```

The `-C` comment is the last line of the public key file. Keep it descriptive — future you (and future auditors) will thank you when you're grepping through an `authorized_keys` file trying to figure out which key belonged to which laptop.

### RSA (legacy compatibility)

If you must connect to something old, generate an RSA key with at least 4096 bits. Anything shorter is a liability:

```bash
ssh-keygen -t rsa -b 4096 -C "you@example.com"
```

Note that [OpenSSH 8.2 deprecated the SHA-1 `ssh-rsa` signature algorithm](https://www.openssh.com/txt/release-8.2) after chosen-prefix SHA-1 collision attacks became affordable. Modern OpenSSH will still speak RSA — it simply signs with SHA-2 by default. If a server rejects your key entirely, it's running something old enough that the right fix is upgrading the server, not weakening the client.

## How do you protect the private key file? {#private-key-protection}

> **Direct answer:** Encrypt the private key with a strong passphrase and lock its file permissions. The passphrase is your second factor if the file is ever stolen; permissions stop local users on a shared box from lifting it in the first place.

### Use a strong passphrase

A passphrase encrypts the private key on disk. Without it, a stolen key file is game over — the file itself is the credential. With it, an attacker also needs to crack the passphrase before they can use the key.

```bash
# Add or change the passphrase on an existing key
ssh-keygen -p -f ~/.ssh/id_ed25519
```

A good SSH passphrase is:

- At least 20 characters long.
- A memorable sentence, not a single word.
- Unique to this key — never reused from your password manager's login.

Ed25519 keys generated by modern OpenSSH use a bcrypt-based key derivation function, so an attacker who steals the file still has to spend serious GPU time per guess. The passphrase does the work of turning that math into a real barrier.

### Lock down file permissions

OpenSSH refuses to load private keys with loose permissions, and for good reason — on a shared host, a world-readable private key is the same as no key at all. In audits I've done, this is the single most common finding on personal laptops that were "just borrowed" from a previous role:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/config
```

If SSH silently refuses to authenticate and drops back to password prompts, permissions are the first thing to check. Add `ssh -v` to the command and OpenSSH will tell you exactly which file it rejected.

## Should you use the SSH agent? {#ssh-agent}

> **Direct answer:** Yes. The agent holds your decrypted private key in memory so you don't retype the passphrase every connection. Combined with `AddKeysToAgent yes` and a locked screen, it's the ergonomics fix that stops people from removing the passphrase entirely.

The agent is what makes a strong passphrase practical. Without it, typing a 25-character sentence every `git push` and every `ssh` gets old, and people quietly regenerate the key without a passphrase to make the friction go away.

```bash
# Start the agent (usually already running on macOS and modern Linux desktops)
eval "$(ssh-agent -s)"

# Add your key — you'll be prompted once per session
ssh-add ~/.ssh/id_ed25519

# List keys currently held by the agent
ssh-add -l

# Remove a key when you're done with it (or step away)
ssh-add -d ~/.ssh/id_ed25519

# On macOS, persist the passphrase in the login Keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

A few discipline items I've settled on the hard way:

- **Never forward the agent (`ForwardAgent yes`) to a host you don't fully trust.** A compromised remote can use your loaded keys to hop laterally. Use `ProxyJump` instead for bastion access.
- **Lock the screen when you walk away.** An unlocked laptop with a loaded agent is an authenticated session waiting to happen.
- **Use `IdentitiesOnly yes`** in `~/.ssh/config` (see next section) so the agent only offers the specific key each host expects, instead of throwing every loaded key at the server and getting rate-limited or logged as suspicious.

## How should you configure ~/.ssh/config for security? {#config}

> **Direct answer:** A per-host `~/.ssh/config` file pins the exact key, user, port, and keepalive settings for every target. Done right, it eliminates guesswork, avoids offering the wrong key to the wrong host, and makes rotation a one-line change.

```
# ~/.ssh/config

# Sensible defaults for every host
Host *
    AddKeysToAgent yes
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 3
    HashKnownHosts yes

# Work bastion
Host work-bastion
    HostName bastion.corp.example.com
    User marc
    IdentityFile ~/.ssh/id_ed25519_work

# Anything behind the bastion — no direct exposure
Host work-*
    ProxyJump work-bastion
    User deploy
    IdentityFile ~/.ssh/id_ed25519_work

# Production — different key, different port, tight config
Host production
    HostName prod.example.com
    User deploy
    IdentityFile ~/.ssh/id_ed25519_prod
    Port 2222
```

Two options in the block above earn their keep every day:

- **`IdentitiesOnly yes`** stops the client from offering every key in `~/.ssh/` to every server. If you have five keys loaded and a server accepts the wrong one for an old account, you may never notice you weren't using the key you meant to.
- **`HashKnownHosts yes`** hashes the entries in `~/.ssh/known_hosts` so a laptop compromise doesn't hand the attacker a nicely enumerated list of every host you SSH into.

## What are the biggest real-world risks with SSH keys? {#ssh-key-risks}

> **Direct answer:** The biggest SSH-key risks aren't cryptographic — they're operational. Orphaned keys, shared keys, keys embedded in code, and weak legacy configurations cause more incidents than broken cipher suites ever will.

I've done enough production SSH audits to be confident about this: I've never seen a breach caused by Ed25519 being weaker than advertised. I've seen dozens caused by the four failures below. Any hardening plan that ignores them is theater.

### Orphaned keys: the silent backdoors

An orphaned key is a public key still sitting in an `authorized_keys` file whose owner has left the company, changed roles, or been decommissioned along with the machine they generated it on. Nobody rotates it. Nobody notices when it's used. It survives every quarterly access review because access reviews look at HR systems, not at `~/.ssh/authorized_keys` on 400 hosts.

[NIST SP 800-171 Rev. 3](https://csrc.nist.gov/pubs/sp/800/171/r3/final) explicitly requires organizations to disable identifiers after a period of inactivity — orphaned SSH keys fail that control by default because there's no `last used` field on an authorized key.

The fix is procedural, not cryptographic: an inventory of every key on every host, mapped to a current employee, reviewed on the same cadence as any other privileged credential.

### Shared or unauthorized keys: the loss of accountability

The other side of the same coin: a single key that four people use because "it's easier." When something breaks at 2 a.m., you can't tell whose session it was. When someone leaves, you can't revoke their access without revoking everyone's. When an incident happens, the audit trail names the shared account, not the human.

If a key is being shared, it isn't a personal credential — it's a service account, and it should be managed like one: stored in a secrets manager, checked out through session recording, and rotated when any of the humans with access to it change roles.

### Embedded and static keys in code

Private keys committed to Git repositories are one of the most common credential leaks online. [GitGuardian's State of Secrets Sprawl 2024 report](https://www.gitguardian.com/state-of-secrets-sprawl-report-2024) tracked 12.8 million new secret occurrences leaked on public GitHub in 2023 — a 28% year-over-year increase — and found that over 90% of leaked secrets remained valid five days after the author was notified. SSH keys are a significant share of that pile.

The mitigations here are boring and effective:

- Pre-commit hooks (`gitleaks`, `detect-secrets`, `trufflehog`) that block a commit if it contains a private key pattern.
- CI-side scanning as a second net.
- A written policy that a leaked key is *revoked*, not just deleted from the repo history — the commit is public the moment it's pushed.

### Weak key configurations and cryptographic risk

Not every "SSH key problem" is a leak. Some are configuration debt: 2048-bit RSA keys still in use, DSA keys deprecated a decade ago, servers still accepting `ssh-rsa` SHA-1 signatures. [OpenSSH 8.2 called this out in its release notes](https://www.openssh.com/txt/release-8.2) and disabled SHA-1 `ssh-rsa` by default in subsequent releases.

Run `ssh-audit` (open-source, [github.com/jtesta/ssh-audit](https://github.com/jtesta/ssh-audit)) against your production SSH servers annually. It'll flag weak ciphers, MACs, host-key algorithms, and — critically — the exact `sshd_config` lines you need to change.

## How often should you rotate SSH keys? {#key-rotation}

> **Direct answer:** Rotate personal keys at least annually, privileged production keys quarterly, and any key immediately after suspected compromise, laptop replacement, or a team member's departure. Treat rotation like patching — schedule it, automate it, verify it.

Rotation is where good intentions go to die. The steps aren't hard, but the coordination is — and the "we'll rotate later" gap is exactly where orphaned keys are born:

1. Generate a fresh key pair with a date-stamped filename.
2. Push the new public key to every host that needs it via Ansible, Chef, Terraform, or your fleet-management tool of choice.
3. Verify connectivity with the new key on every target.
4. Remove the old public key from `authorized_keys` everywhere.
5. Archive or securely delete the old private key.

```bash
# Date-stamped key rotation, ready to feed into your config-management tool
NEW_KEY="id_ed25519_$(date +%Y%m)"
ssh-keygen -t ed25519 -f ~/.ssh/"$NEW_KEY" -C "rotated $(date +%Y-%m)"
```

Step 4 is the one that gets skipped. Skipping it turns rotation into accumulation — the same problem as orphaned keys, but self-inflicted.

## Should you use a hardware security key for SSH? {#hardware-keys}

> **Direct answer:** Yes, for anything that touches production. A FIDO2 token like a YubiKey stores the SSH private key on the device itself, requires physical touch per authentication, and makes remote key theft effectively impossible.

[OpenSSH 8.2 introduced FIDO/U2F support](https://www.openssh.com/txt/release-8.2) with two new key types: `ecdsa-sk` and `ed25519-sk`. The `-sk` stands for "security key" — the private key material is bound to the physical token and cannot be extracted, even by someone with full access to the machine that generated it.

```bash
# Ed25519 key bound to a FIDO2 token (requires the token to be plugged in)
ssh-keygen -t ed25519-sk -C "you@example.com yubikey $(date +%Y)"

# ECDSA variant for tokens that don't yet support ed25519-sk
ssh-keygen -t ecdsa-sk -C "you@example.com yubikey $(date +%Y)"
```

Every `ssh` connection using an `-sk` key prompts you to tap the token. That physical gesture is what stops silent, remote key use — malware on your laptop with full access to your files still can't authenticate on your behalf without your finger.

For maximum portability across machines, generate `-O resident` keys so the token itself holds enough state to be used from a fresh laptop without needing the on-disk key handle. The trade-off: a stolen token becomes more valuable, so set a PIN on the token before creating resident keys.

## How do you audit SSH keys across your fleet? {#auditing}

> **Direct answer:** You can't secure what you can't inventory. Build a scheduled job that pulls every `authorized_keys` file across every host, joins it against a source of truth for current employees, and flags every unattributed key for review.

Every organization I've worked with that had a "we manage our SSH keys" story turned out to have keys nobody could explain — until we looked. The exercise is worth doing at least annually. A minimal starting point:

```bash
# Per-host: enumerate authorized keys with their comments
for user in $(cut -f1 -d: /etc/passwd); do
  keyfile="/home/$user/.ssh/authorized_keys"
  [ -f "$keyfile" ] || continue
  awk -v u="$user" '{print u, $NF}' "$keyfile"
done
```

Pipe that across every host via your config-management tool, load the results into a spreadsheet or database, and diff against your current directory of employees and service accounts. Every row that doesn't map to an active identity is a candidate for revocation. Repeat quarterly.

For a more mature setup, use a certificate authority: instead of long-lived keys in `authorized_keys`, issue short-lived SSH certificates from a CA (HashiCorp Vault, StepCA, Teleport). Certificates expire on their own, carry the requester's identity as a principal, and eliminate most of the accumulation problem.

---

Securing SSH keys isn't a one-time hardening exercise — it's a lifecycle. Generate strong keys, protect them with a passphrase, put them on a hardware token for anything that matters, and — most importantly — audit and rotate them the same way you'd audit and rotate any other privileged credential.

Credential management goes beyond SSH keys. Learn why [two-factor authentication](/2026/02/16/2fa-the-5-minute-fix-that-stops-99-percent-of-account-attacks/) is essential for every account, and how [credential theft has become the new normal](/2026/04/12/credential-theft-new-normal-cyber-attacks/) in cyber attacks.
