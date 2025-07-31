# Bambulab Filament Profiles

A community-driven platform for sharing and discovering 3D printer filament profiles for Bambulab printers.

## 🚀 Features

- **Browse & Search**: Discover filament profiles by producer, material type, or name
- **Upload Profiles**: Share your custom filament configurations with the community
- **User Profiles**: Manage your uploaded profiles in a dedicated dashboard
- **Community Voting**: Upvote/downvote profiles to help others find quality configurations
- **Download Tracking**: See which profiles are most popular
- **Sorting Options**: Sort by newest, most votes, or most downloads

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore + Storage)
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **File Handling**: JSZip for profile archives

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### 1. Clone the Repository

```bash
git clone https://github.com/magnus188/Bambulab-profile.git
cd Bambulab-profile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Create a web app in your Firebase project
4. Copy the configuration values

### 4. Environment Setup

```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit .env.local with your Firebase configuration
```

Fill in your Firebase configuration in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Available Scripts

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
npm run type-check   # Run TypeScript type checking
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 🔧 Firebase Setup Details

For detailed Firebase setup instructions, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- Create an [Issue](https://github.com/magnus188/Bambulab-profile/issues) for bug reports or feature requests
- Join our community discussions

## 🔒 Security

- Never commit `.env.local` or any files containing sensitive information
- All environment variables are properly configured
- Firebase security rules are implemented for data protection

---

Made with ❤️ for the 3D printing community

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/magnus188/Bambulab-profile.git
   cd "Bambulab profile"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database and Storage
   - Enable Authentication (Email/Password)
   - Copy your config to `src/lib/firebase.ts`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

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

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:ci
```

### CI/CD Pipeline

The project uses GitHub Actions for continuous integration:
- ✅ **Automated Testing**: Tests run on every pull request to `main`
- ✅ **Multi-Node Support**: Tests on Node.js 18.x and 20.x
- ✅ **Code Quality**: ESLint checks for code standards
- ✅ **Coverage Reports**: Test coverage tracking with Codecov
- ✅ **PR Protection**: Branch protection prevents direct pushes to main

**All tests must pass before merging PRs to main.**

### Branch Protection Setup

To enable branch protection in GitHub:
1. Go to **Settings** → **Branches** in your GitHub repo
2. Click **Add rule** for `main` branch
3. Enable these settings:
   - ✅ "Require status checks to pass before merging"
   - ✅ "Require branches to be up to date before merging"
   - ✅ Select: `test (18.x)` and `test (20.x)` status checks
   - ✅ "Restrict pushes that create files larger than 100 MB"
   - ✅ "Require pull request reviews before merging"

This ensures all code changes go through PR review and automated testing!

## 🚀 Deployment

The app is optimized for deployment on Vercel:

```bash
npm run build
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Bambulab for creating amazing 3D printers
- The 3D printing community for sharing knowledge and profiles
