---
layout: post
title: "Reverse Engineering Basics"
category: Reverse Engineering
tags: [Ghidra, IDA Pro, Malware Analysis]
author: Admin
---

Getting started with Ghidra and IDA Pro for analyzing malware binaries. A beginner's guide to disassembling code.

## What is Reverse Engineering?

Reverse engineering is the process of analyzing a system to understand its components and workings. In security, we use it to:

- Analyze malware behavior
- Find vulnerabilities in software
- Understand proprietary protocols
- Develop exploits and patches

## Essential Tools

### Ghidra

Ghidra is a free, open-source reverse engineering tool developed by the NSA. It's become the go-to choice for many security researchers.

**Key Features:**
- Powerful decompiler (converts assembly to C-like code)
- Scripting support (Python and Java)
- Collaborative analysis features
- Support for many processor architectures

### IDA Pro

IDA Pro remains the industry standard for professional reverse engineering. While expensive, it offers unmatched analysis capabilities.

**Key Features:**
- Interactive disassembly
- Extensive plugin ecosystem
- Hex-Rays decompiler (separate purchase)
- Debugging integration

## Getting Started with Ghidra

### Installation

1. Download from [ghidra-sre.org](https://ghidra-sre.org)
2. Extract the archive
3. Run `ghidraRun` (requires Java 11+)

### Basic Workflow

1. **Create a Project** — File → New Project
2. **Import Binary** — File → Import File
3. **Analyze** — Let Ghidra auto-analyze (click "Yes" when prompted)
4. **Explore** — Navigate the code using Symbol Tree and Listing views

### Useful Ghidra Shortcuts

| Shortcut | Action |
|----------|--------|
| `G` | Go to address |
| `L` | Rename label/function |
| `T` | Change data type |
| `;` | Add comment |
| `Ctrl+Shift+E` | Show references to selection |
| `Tab` | Toggle decompiler view |

## Understanding Assembly Basics

Before diving into RE, understand these fundamental concepts:

### Registers (x86-64)

```
RAX - Accumulator (return values)
RBX - Base register (callee-saved)
RCX - Counter (4th argument)
RDX - Data (3rd argument)
RSI - Source index (2nd argument)
RDI - Destination index (1st argument)
RSP - Stack pointer
RBP - Base pointer
```

### Common Instructions

```nasm
; Data movement
mov rax, rbx      ; Copy rbx to rax
push rax          ; Push rax onto stack
pop rbx           ; Pop from stack to rbx

; Arithmetic
add rax, 5        ; rax = rax + 5
sub rbx, rax      ; rbx = rbx - rax
xor eax, eax      ; Zero out eax (common pattern)

; Control flow
cmp rax, rbx      ; Compare rax and rbx
je label          ; Jump if equal
jne label         ; Jump if not equal
call function     ; Call function
ret               ; Return from function
```

## Malware Analysis Checklist

When analyzing a suspicious binary:

1. **Static Analysis**
   - Check file hashes (VirusTotal)
   - Examine strings (`strings` command)
   - Identify imports/exports
   - Look for obfuscation signs

2. **Dynamic Analysis** (in sandbox!)
   - Monitor file system activity
   - Watch network connections
   - Track registry changes
   - Observe process behavior

3. **Code Analysis**
   - Identify entry point
   - Follow main execution flow
   - Document interesting functions
   - Look for C2 communication

## Safety First

**Never analyze malware on your main system!**

Use isolated environments:
- Virtual machines (VMware, VirtualBox)
- Sandboxes (Cuckoo, Any.Run)
- Air-gapped analysis machines

---

*Reverse engineering is a skill that takes time to develop. Start with simple programs and gradually work up to more complex binaries. Happy hunting!*



