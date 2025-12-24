---
layout: post
title: "How to Secure Your SSH Keys"
category: Cryptography
tags: [SSH, Authentication, Best Practices]
author: Admin
---

Best practices for generating, storing, and managing SSH keys for secure server access. Stop using passwords and start using public key authentication.

## Why SSH Keys?

Password-based authentication is vulnerable to brute force attacks, credential stuffing, and phishing. SSH key authentication provides stronger security through asymmetric cryptography.

## Generating Strong Keys

### Ed25519 (Recommended)

Ed25519 keys offer the best security-to-performance ratio and are recommended for most use cases:

```bash
# Generate Ed25519 key with a comment
ssh-keygen -t ed25519 -C "your_email@example.com"

# With custom filename
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_work -C "work key"
```

### RSA (Legacy Compatibility)

If you need compatibility with older systems, use RSA with at least 4096 bits:

```bash
# Generate 4096-bit RSA key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## Protecting Your Private Key

### Strong Passphrases

Always use a strong passphrase to encrypt your private key:

```bash
# Change passphrase on existing key
ssh-keygen -p -f ~/.ssh/id_ed25519
```

A good passphrase should be:
- At least 20 characters long
- A memorable sentence or phrase
- Unique to this key

### File Permissions

Ensure proper permissions on your SSH files:

```bash
# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/config
```

## SSH Agent

Use SSH agent to avoid typing your passphrase repeatedly:

```bash
# Start the agent
eval "$(ssh-agent -s)"

# Add your key (will prompt for passphrase)
ssh-add ~/.ssh/id_ed25519

# List loaded keys
ssh-add -l

# For macOS, add to Keychain
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

## SSH Config Best Practices

Create a well-organized SSH config file:

```bash
# ~/.ssh/config

# Default settings for all hosts
Host *
    AddKeysToAgent yes
    IdentitiesOnly yes
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Work servers
Host work-*
    User admin
    IdentityFile ~/.ssh/id_ed25519_work

# Specific host configuration
Host production
    HostName prod.example.com
    User deploy
    IdentityFile ~/.ssh/id_ed25519_deploy
    Port 2222
```

## Key Rotation

Regularly rotate your SSH keys:

1. Generate a new key pair
2. Add the new public key to all servers
3. Test connectivity with the new key
4. Remove the old public key from servers
5. Archive or securely delete the old private key

```bash
# Quick script for key rotation
NEW_KEY="id_ed25519_$(date +%Y%m)"
ssh-keygen -t ed25519 -f ~/.ssh/$NEW_KEY -C "rotated $(date +%Y-%m)"
```

## Hardware Security Keys

For maximum security, consider using hardware security keys (like YubiKey):

```bash
# Generate key stored on hardware token
ssh-keygen -t ed25519-sk -C "your_email@example.com"
```

This creates a key that requires physical touch to use, providing excellent protection against remote key theft.

---

*Security starts with good key hygiene. Take the time to properly manage your SSH keys—your servers will thank you.*



