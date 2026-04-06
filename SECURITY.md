# Security Policy

## Supported Versions

| Version | Status | Security Updates |
|---------|--------|------------------|
| 0.1.x | Current | ✅ Yes |
| < 0.1.0 | Unsupported | ❌ No |

## Reporting Security Issues

**Please do not publicly report security vulnerabilities.**

If you discover a security issue, email `security@emergent.dev` with:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will respond within 48 hours.

## Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **CORS Protection** - Configured origin validation
- ✅ **SQL Injection Prevention** - Prisma ORM
- ✅ **XSS Protection** - React auto-escaping
- ✅ **Rate Limiting** - Request throttling
- ✅ **HTTPS Ready** - Full TLS support planned
- ✅ **Input Validation** - Validation pipes

## Security Best Practices

### For Users

- Use strong passwords
- Enable 2FA when available
- Keep browser updated
- Use HTTPS only
- Don't share tokens

### For Developers

- Use environment variables for secrets
- Enable HTTPS in production
- Keep dependencies updated
- Use `.env` files (not committed)
- Review commit history
- Run security audits: `npm audit`

### For Operators

- Use strong database passwords
- Enable backups
- Monitor access logs
- Keep Docker images updated
- Use firewalls
- Regular security updates
- Monitor resource usage

## Vulnerability Disclosure Timeline

1. **Day 1**: Report received + acknowledgment
2. **Day 7**: Fix development begins
3. **Day 14**: Fix ready + public disclosure timing discussed
4. **Day 30**: Public disclosure (unless extended)

## Security Checklist

- [ ] Strong JWT_SECRET (32+ characters)
- [ ] CORS configured properly
- [ ] HTTPS enabled (production)
- [ ] Database backups enabled
- [ ] Rate limiting configured
- [ ] Input validation active
- [ ] Secrets not in git
- [ ] Dependencies updated regularly
- [ ] Access logs monitored
- [ ] Incident response plan

## Known Issues

None currently. Report security issues privately.

## Contact

🔒 **Security Team**: security@emergent.dev

---

Last Updated: April 2024
