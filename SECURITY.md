# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** create a public GitHub issue
2. Send an email to [your-email@example.com] with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Measures

This project implements several security measures:

### Environment Variables
- All sensitive configuration is stored in environment variables
- `.env.local` files are git-ignored
- Example files contain no real credentials

### Firebase Security
- Firebase security rules protect user data
- Authentication is required for write operations
- User data is isolated per authenticated user

### Code Security
- Dependencies are regularly updated
- No sensitive data is logged or exposed
- Input validation on all user-submitted data

### Deployment Security
- Environment variables are securely managed in Vercel
- HTTPS enforced on all deployed versions
- No secrets in GitHub Actions logs

## Best Practices for Contributors

1. Never commit real API keys or credentials
2. Use environment variables for all configuration
3. Validate all user inputs
4. Follow principle of least privilege
5. Keep dependencies updated

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed. Check the [releases page](https://github.com/magnus188/Bambulab-profile/releases) for security-related updates.
