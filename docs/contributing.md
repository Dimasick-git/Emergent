# Contributing Guide

Thank you for your interest in contributing to Emergent! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Follow our community guidelines
- Report issues privately if they involve security

## Getting Started

### Fork and Clone

```bash
git clone https://github.com/your-fork/Emergent.git
cd Emergent
git remote add upstream https://github.com/Dimasick-git/Emergent.git
```

### Set Up Development Environment

```bash
npm install
npm run dev
```

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

- Follow the existing code style
- Write tests for new features
- Update documentation

### 3. Commit Changes

```bash
git commit -m "feat: add my feature"
```

#### Commit Message Format

```
type: subject

body (optional)
footer (optional)
```

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Refactoring
- `perf:` Performance
- `test:` Tests
- `chore:` Dependencies

### 4. Push and Create PR

```bash
git push origin feature/my-feature
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

```typescript
// Use strict mode
// Add return types
// Document with JSDoc

/**
 * Get user by ID
 * @param id - User ID
 * @returns User object or null
 */
async function getUser(id: string): Promise<User | null> {
  // implementation
}
```

### Format Code

```bash
npm run format
npm run lint
```

### Testing

```bash
npm run test
npm run test:cov
```

## Submitting Changes

### Before Submitting

- [ ] Code follows style guide
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Commit messages are clear

### PR Information

Include in your PR description:

- What changes you made?
- Why are these changes needed?
- How can reviewers test the changes?
- Links to related issues

## Review Process

1. **Automated Checks** - CI/CD pipeline runs
2. **Code Review** - Maintainers review your code
3. **Feedback** - Address feedback if needed
4. **Approval** - PR is approved and merged

## Reporting Bugs

### Security Issues

**Do not** post security issues publicly. Email security@example.com instead.

### Bug Reports

Create an issue with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment info
- Screenshots if applicable

## Suggesting Features

Create an issue with:

- Clear feature description
- Why is it needed?
- Possible implementation approaches
- Alternative solutions

## Documentation

### Writing Docs

1. Use clear, simple language
2. Include examples
3. Add code snippets
4. Update table of contents

### Markdown Format

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- List item
- Another item

```code block```

[Link text](url)
```

## Areas We Need Help

- [ ] Frontend components
- [ ] Backend services
- [ ] Documentation
- [ ] Tests
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Security improvements

## Questions?

- 💬 [GitHub Discussions](https://github.com/Dimasick-git/Emergent/discussions)
- 🐛 [Bug Reports](https://github.com/Dimasick-git/Emergent/issues)
- 📖 [Documentation](./docs)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

---

**Happy coding!** 🚀
