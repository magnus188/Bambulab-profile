# Bambulab Filament Profiles

A Next.js app## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── my-profiles/       # User dashboard
│   └── signin/            # Auth pages
├── components/            # React components
├── contexts/              # React contexts (Auth, Theme)
├── lib/                   # Firebase config
├── services/              # Firebase service layer
├── types/                 # TypeScript definitions
└── utils/                 # Utility functions
```

## Contributing

### Development Workflow
1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Set up Firebase (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
4. Make changes and test locally
5. Run `npm run ci` to validate changes
6. Submit a pull request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- Test coverage for new features
- Firebase security rules validation

### Testing Strategy
- Unit tests with Jest
- Component testing with React Testing Library
- E2E testing for critical paths
- Firebase emulator for integration tests

## CI/CD

GitHub Actions pipeline runs on every PR:
- ESLint and type checking
- Unit tests with coverage
- Build verification
- Vercel preview deployment

Branch protection requires:
- All tests passing
- No TypeScript errors
- ESLint compliance
- Review approval

## Firebase Architecture

### Collections
- `profiles/` - Filament profile documents
- `users/` - User profile data
- `votes/` - Profile voting records

### Security Rules
- Read access: Public for profiles, private for user data
- Write access: Authenticated users only
- File uploads: Size and type validation

### Storage Structure
```
profiles/
├── {profileId}/
│   ├── profile.3mf
│   └── thumbnail.jpg
```

## License

MIT License - see [LICENSE](LICENSE) for details.aring and discovering 3D printer filament profiles for Bambulab printers.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Firebase** (Authentication, Firestore, Storage)
- **Tailwind CSS**
- **React Hook Form**

## Development Setup

### Prerequisites
- Node.js 18+
- Firebase project (free tier sufficient)

### Quick Start
```bash
git clone https://github.com/magnus188/Bambulab-profile.git
cd Bambulab-profile
npm install
cp .env.local.example .env.local
# Add your Firebase config to .env.local
npm run dev
```

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for Firebase configuration details.

### Available Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run test         # Run tests
npm run test:ci      # Tests with coverage
npm run lint         # ESLint
npm run lint:ci      # ESLint (CI mode)
npm run type-check   # TypeScript validation
npm run ci           # Full CI pipeline locally
```

## � Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── my-profiles/       # User profile management
│   └── signin/            # Authentication
├── components/            # Reusable UI components
├── contexts/              # React contexts (Auth, Theme)
├── lib/                   # Firebase configuration
├── services/              # API layer for Firebase operations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:ci      # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:ci      # Run ESLint with CI environment
npm run type-check   # Run TypeScript type checking

# CI/CD Validation
npm run ci           # Run core CI checks (lint:ci + type-check + test:ci)
npm run ci:full      # Run complete CI pipeline
```

## 🧪 Testing

Run the test suite to ensure your changes work correctly:

```bash
npm test              # Run tests once
npm run test:ci       # Run tests with coverage
```

Before submitting a pull request, run the full CI validation:

```bash
npm run ci           # Quick validation
npm run ci:full      # Complete validation (matches GitHub Actions)
```

## 🤝 Contributing

Contributions are welcome! This project was created to serve the 3D printing community, and community input helps make it better.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test them locally
4. **Run the test suite**: `npm run ci` to ensure everything works
5. **Commit your changes**: `git commit -m 'Add your feature description'`
6. **Push to your branch**: `git push origin feature/your-feature-name`
7. **Open a Pull Request** with a description of your changes

### Contribution Guidelines

- All tests must pass before merging
- Follow the existing code style (ESLint will check this)
- Add tests for new features when possible
- Update documentation if you're changing functionality

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Development Workflow

The project uses GitHub Actions for CI/CD:
- **Automated Testing**: Tests run on every PR
- **Multi-Node Support**: Tested on Node.js 18.x and 20.x
- **Code Quality**: ESLint enforces code standards
- **Branch Protection**: PRs require passing tests before merge

## 🚀 Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
npm start
```

## � Security

When contributing:
- Never commit `.env.local` or sensitive information
- All environment variables should be properly configured
- Firebase security rules protect user data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Issues

- **Bug Reports**: Create an [Issue](https://github.com/magnus188/Bambulab-profile/issues) with details
- **Feature Requests**: Open an issue with your idea
- **Questions**: Use GitHub Discussions for community help

---

Made with ❤️ for the 3D printing community

## 🙏 Acknowledgments

- Bambulab for creating amazing 3D printers
- The 3D printing community for sharing knowledge and profiles
- All contributors who help improve this platform
