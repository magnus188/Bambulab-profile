# Bambu Lab Filament Profiles

A community-driven web application for sharing and downloading Bambu Lab 3D printer filament profiles. Built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- ✅ **No Sign-in Required** - Simple and accessible for everyone
- 📤 **Upload Profiles** - Share your optimized filament settings (JSON files)
- 🔍 **Search & Filter** - Find profiles by name, producer, or filament type
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js for optimal speed
- 🔒 **Duplicate Prevention** - Alerts when profile names already exist

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore & Storage
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd bambulab_profiles
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable Firestore Database:
   - Go to "Firestore Database" in the Firebase console
   - Click "Create database"
   - Choose "Start in test mode" (you can secure it later)
   - Select your preferred location

3. Enable Firebase Storage:
   - Go to "Storage" in the Firebase console
   - Click "Get started"
   - Choose "Start in test mode"

4. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" and click on the web app icon
   - Copy the configuration object

5. Update your `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Security Rules (Optional but Recommended)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /filament-profiles/{document} {
      allow read: if true;
      allow write: if request.resource.data.keys().hasAll(['name', 'producer', 'fileName', 'fileUrl', 'uploadedAt']) 
        && request.resource.data.name is string
        && request.resource.data.producer is string
        && request.resource.data.fileName is string
        && request.resource.data.fileUrl is string;
    }
  }
}
```

And Firebase Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.contentType == 'application/json'
        && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Go to [vercel.com](https://vercel.com) and sign up/in

3. Click "New Project" and import your repository

4. Add your environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all your `NEXT_PUBLIC_FIREBASE_*` variables

5. Deploy! Vercel will automatically build and deploy your app.

### GitHub Actions CI/CD

This project includes comprehensive GitHub Actions workflows:

#### Required Secrets

Add these secrets to your GitHub repository:

**Firebase Configuration:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Vercel Deployment (Optional):**
- `VERCEL_TOKEN` - Your Vercel API token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

#### Available Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on every push and PR
   - Tests with multiple Node.js versions
   - Linting, type checking, and building
   - Automatic deployment to Vercel on main branch

2. **Security & Dependencies** (`.github/workflows/security.yml`)
   - Security audits and vulnerability scanning
   - CodeQL analysis for code security
   - Dependency review for PRs

3. **Dependency Updates** (`.github/workflows/update-deps.yml`)
   - Weekly automated dependency updates
   - Creates PRs with updated packages
   - Runs tests to ensure compatibility

4. **Lighthouse Performance** (`.github/workflows/lighthouse.yml`)
   - Performance, accessibility, and SEO testing
   - Runs on every push and PR
   - Generates performance reports

### Other Deployment Options

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Digital Ocean App Platform

## Usage

### Uploading a Profile

1. Click the "Upload Profile" button
2. Fill in the filament name and producer
3. Select a JSON file containing the profile settings
4. Click "Upload"

### Downloading a Profile

1. Browse or search for the profile you want
2. Click the download button on any profile card
3. The JSON file will be downloaded to your device

### Using Profiles with Bambu Studio

1. Download the JSON profile file
2. In Bambu Studio, go to the filament settings
3. Import the downloaded JSON file
4. The profile settings will be applied automatically

## Contributing

This is an open-source project! Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

## Community

Join the Bambu Lab 3D printing community to share tips, profiles, and get help with your prints!

---

**Happy Printing!** 🖨️✨
