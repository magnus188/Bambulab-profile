# Contributing to Bambu Lab Filament Profiles

Thank you for your interest in contributing to this community-driven project! This platform was created to help the 3D printing community share and discover optimal filament profiles, and contributions from developers like you help make it better for everyone.

## 🚀 Quick Start for Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Bambulab-profile.git
   cd Bambulab-profile
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your development environment** (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
6. **Make your changes** and test them
7. **Submit a pull request**

## 🛠️ Development Environment

### Prerequisites
- Node.js 18+
- Your own Firebase project for development (free tier works fine)
- Git

### Setup Steps

1. **Environment Configuration:**
   ```bash
   cp .env.local.example .env.local
   # Add your Firebase config to .env.local
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Verify Setup:**
   - Open [http://localhost:3000](http://localhost:3000)
   - Try creating an account and uploading a test profile

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed Firebase configuration instructions.

## 🔒 Security Guidelines

**CRITICAL**: Protect sensitive information!

- ✅ **DO**: Use `.env.local` for your local Firebase config
- ✅ **DO**: Use environment variables for all sensitive data
- ❌ **DON'T**: Commit API keys, passwords, or credentials
- ❌ **DON'T**: Commit `.env.local` files to git
- ✅ **DO**: Use the `.env.local.example` template as reference

## 🧪 Testing Your Changes

Before submitting a pull request, ensure your changes work correctly:

```bash
# Run tests
npm test

# Run linting
npm run lint

# Test the full CI pipeline locally
npm run ci

# Build the project
npm run build
```

### Manual Testing Checklist
- [ ] Test in both light and dark modes
- [ ] Verify responsive design on different screen sizes
- [ ] Test Firebase authentication (sign up, sign in, sign out)
- [ ] Test profile upload and download functionality
- [ ] Check cross-browser compatibility

## 📝 Code Style and Standards

This project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **Next.js** App Router for routing

### Guidelines:
- Follow existing code patterns and naming conventions
- Use meaningful variable and function names
- Add TypeScript types for new functions and components
- Write comments for complex logic
- Keep components small and focused

### Commit Message Format
Use conventional commit messages:

```
type(scope): description

Examples:
feat: add profile filtering by material type
fix: resolve upload dialog closing issue
docs: update installation instructions
style: improve mobile responsive design
test: add unit tests for profile service
```

## 🔄 Pull Request Process

1. **Create a descriptive title**: Clearly explain what your PR does
2. **Fill out the PR template**: Provide context and testing details
3. **Ensure CI passes**: All automated checks must pass
4. **Request review**: The maintainer will review your changes
5. **Address feedback**: Respond to comments and make requested changes
6. **Merge**: Once approved, your PR will be merged

### PR Requirements
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Changes are well-documented
- [ ] No breaking changes (unless discussed)
- [ ] Firebase integration tested

## 🐛 Reporting Issues

When reporting bugs or requesting features:

1. **Search existing issues** first to avoid duplicates
2. **Use issue templates** when available
3. **Provide clear details**:
   - Steps to reproduce the problem
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if helpful
4. **Be respectful** and constructive in your communication

## 🎯 Types of Contributions Welcome

### 🐛 Bug Fixes
- Fix reported issues
- Improve error handling and user feedback
- Resolve performance bottlenecks
- Fix responsive design issues

### ✨ New Features
- Enhanced search and filtering capabilities
- Better user profile management
- Improved file upload/download experience
- Accessibility improvements

### 📚 Documentation
- Improve setup and contribution guides
- Add inline code documentation
- Create user tutorials
- Update API documentation

### 🎨 UI/UX Enhancements
- Design improvements
- Better mobile experience
- Enhanced dark mode support
- Improved user workflows

### 🔧 Technical Improvements
- Performance optimizations
- Code refactoring
- Test coverage improvements
- CI/CD pipeline enhancements

## 🚧 Development Tips

### Working with Firebase
- Use Firebase Emulator Suite for offline development
- Be mindful of free tier quotas during development
- Test with realistic file sizes and data volumes
- Follow Firebase security best practices

### Testing Strategies
- Test profile upload/download with various file types
- Verify authentication flows work correctly
- Check responsive design across devices
- Test both light and dark themes
- Validate search and filtering functionality

### Performance Considerations
- Optimize image loading and display
- Implement proper error boundaries
- Use React best practices for state management
- Consider lazy loading for large lists

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). All contributors are expected to be respectful, inclusive, and constructive in their interactions.

## 💬 Getting Help

Need assistance with your contribution?

1. **Check the documentation**: README, FIREBASE_SETUP, and this guide
2. **Browse existing issues and PRs** for examples and solutions
3. **Open a discussion** for questions about implementation approaches
4. **Reach out in issues** if you're stuck on something specific

## 🙏 Recognition

All contributors are valued and will be recognized for their efforts. This project exists to serve the 3D printing community, and every contribution helps make it better for users worldwide.

---

Thank you for helping improve this platform for the Bambu Lab and broader 3D printing community! 🎯✨
