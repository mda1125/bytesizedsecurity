# Security Policy

## About This Project

ByteSizedSecurity is a static blog built with Jekyll and hosted on GitHub Pages. It provides cybersecurity insights, analysis, and educational content for security professionals and enthusiasts.

### Technology Stack

- **Static Site Generator**: Jekyll
- **Hosting**: GitHub Pages
- **Styling**: Tailwind CSS (via CDN)
- **Newsletter**: SendFox
- **Syntax Highlighting**: Highlight.js

## Scope

Since this is a static website with no backend, database, or user authentication, the attack surface is limited. However, we still take security seriously.

### In Scope

- Cross-site scripting (XSS) vulnerabilities in rendered content
- Sensitive data exposure in the repository
- Misconfigurations that could impact site integrity
- Third-party dependency vulnerabilities
- Issues with external integrations (newsletter forms, etc.)

### Out of Scope

- GitHub Pages infrastructure (report to GitHub directly)
- CDN-hosted libraries (Tailwind, Google Fonts, etc.)
- Social engineering attacks
- Denial of service attacks

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

### How to Report

**Email**: [marc@bytesizedsecurity.show](mailto:marc@bytesizedsecurity.show)

Please include:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested remediation (optional but appreciated)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depends on severity, typically within 30 days
- **Credit**: We're happy to credit researchers who report valid vulnerabilities (unless you prefer to remain anonymous)

### Please Don't

- Publicly disclose the vulnerability before we've had a chance to address it
- Access, modify, or delete data that doesn't belong to you
- Perform any testing that could degrade the site's availability

## Security Best Practices We Follow

- No sensitive data stored in the repository
- Regular dependency updates
- Content Security Policy considerations
- HTTPS enforced via GitHub Pages

---

Thank you for helping keep ByteSizedSecurity safe! 🛡️
