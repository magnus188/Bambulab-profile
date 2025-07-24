# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Create a Public Issue

Please do not create a public GitHub issue for security vulnerabilities. This helps protect users until a fix can be implemented.

### 2. Report Privately

Instead, please report security vulnerabilities by:

- **Email**: Send details to [your-email@domain.com] with the subject "Security Vulnerability"
- **GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature

### 3. Include Details

When reporting, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes or mitigations
- Your contact information (optional, but helpful for follow-up)

### 4. Response Timeline

We are committed to addressing security issues promptly:

- **24 hours**: Initial acknowledgment of your report
- **7 days**: Preliminary assessment and response plan
- **30 days**: Resolution or detailed update on progress

## Security Best Practices

### For Users

- Keep your Firebase configuration secure
- Use environment variables for sensitive data
- Regularly update dependencies
- Monitor for security alerts

### For Contributors

- Never commit sensitive information (API keys, passwords, etc.)
- Use `.env.local` for local environment variables
- Follow secure coding practices
- Run security audits before submitting PRs

## Firebase Security

This application uses Firebase services. Security considerations:

### Firestore Security Rules

Our Firestore rules are designed to:
- Allow public read access to profiles
- Validate data structure on writes
- Prevent unauthorized modifications
- Limit file upload sizes

### Storage Security Rules

Firebase Storage rules:
- Allow public read access to profile files
- Restrict uploads to JSON files only
- Implement file size limits
- Use structured file paths

### Client-Side Security

- All Firebase configuration uses public keys (as intended)
- Sensitive operations are protected by server-side rules
- Input validation on both client and server sides

## Dependencies

We regularly monitor and update dependencies:

- Automated security scanning via GitHub Dependabot
- Regular dependency audits using `npm audit`
- Automated updates for non-breaking security patches

## Responsible Disclosure

We believe in responsible disclosure and will:

1. Work with security researchers to validate and fix issues
2. Provide credit to researchers who responsibly disclose vulnerabilities
3. Coordinate disclosure timing to protect users
4. Maintain transparency about security improvements

## Contact

For security-related questions or concerns:
- **Security Email**: [your-security-email@domain.com]
- **General Contact**: [your-email@domain.com]

Thank you for helping keep our community safe! 🔒
