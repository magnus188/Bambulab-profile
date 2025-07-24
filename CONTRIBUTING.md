# Contributing to Bambu Lab Filament Profiles

Thank you for your interest in contributing to this project! I welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase configuration:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase configuration variables

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Code Style

- I use TypeScript for type safety
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Run `npm run lint` to check code style

## Commit Messages

Please use conventional commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example: `feat: add search functionality to profile grid`

## Pull Request Process

1. **Create a descriptive title** that explains what your PR does
2. **Fill out the PR template** with all relevant information
3. **Ensure all checks pass** (CI/CD, linting, building)
4. **Request review** from maintainers
5. **Address feedback** promptly and respectfully

## Reporting Issues

When reporting issues, please:

1. Use the issue templates provided
2. Include steps to reproduce the problem
3. Provide browser and environment information
4. Add screenshots if applicable

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please be respectful and inclusive in all interactions.

## Types of Contributions

I welcome various types of contributions:

### 🐛 Bug Fixes
- Fix issues reported in GitHub Issues
- Improve error handling
- Fix performance problems

### ✨ New Features
- Add new functionality
- Improve user experience
- Add accessibility features

### 📚 Documentation
- Improve README and setup instructions
- Add code comments
- Create tutorials or guides

### 🎨 UI/UX Improvements
- Improve design and styling
- Enhance responsive design
- Improve dark mode support

### 🔧 Infrastructure
- Improve CI/CD pipelines
- Add automated testing
- Optimize build processes

## Testing Guidelines

Before submitting a PR:

1. **Test locally** - Make sure your changes work as expected
2. **Test different browsers** - Ensure cross-browser compatibility
3. **Test responsive design** - Check mobile and desktop views
4. **Test dark/light modes** - Verify both themes work correctly
5. **Test Firebase integration** - Ensure upload/download functionality works

## Firebase Development Tips

When working with Firebase:

1. Use the Firebase Emulator Suite for local development when possible
2. Be mindful of Firebase quotas and costs
3. Follow Firebase security best practices
4. Test file uploads with various file sizes and types

## Getting Help

If you need help with your contribution:

1. Check the README for setup instructions
2. Look at existing issues and PRs for examples
3. Ask questions in GitHub Discussions
4. Reach out to maintainers for guidance


Thank you for contributing to making this project better for the Bambu Lab 3D printing community! 🎯✨
