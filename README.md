# Bambulab Filament Profiles

A community-driven platform for sharing and discovering 3D printer filament profiles for Bambulab printers. This open-source project helps 3D printing enthusiasts find and share optimal print settings for various filaments.

## 🚀 Features

- **Browse & Search**: Discover filament profiles by producer, material type, or name
- **Upload Profiles**: Share your custom filament configurations with the community
- **User Profiles**: Manage your uploaded profiles in a dedicated dashboard
- **Community Voting**: Upvote/downvote profiles to help others find quality configurations
- **Download Tracking**: See which profiles are most popular
- **Sorting Options**: Sort by newest, most votes, or most downloads

## 🏃‍♂️ Quick Start for Contributors

Want to contribute to this project? Here's how to get it running locally:

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (for backend services)

### 1. Clone and Setup

```bash
git clone https://github.com/magnus188/Bambulab-profile.git
cd Bambulab-profile
npm install
```

### 2. Environment Configuration

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note**: You'll need to set up your own Firebase project for development. See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions.

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application running locally.

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
