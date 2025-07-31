# Firebase Development Setup

Firebase configuration for local development. Each contributor needs their own Firebase project.

## Firebase Project Setup

### 1. Create Project
```bash
# Using Firebase CLI (recommended)
npm install -g firebase-tools
firebase login
firebase projects:create your-project-id
```

Or manually via [Firebase Console](https://console.firebase.google.com/).

### 2. Enable Services
```bash
# Enable required services
firebase use your-project-id
firebase projects:addfirebase --project=your-project-id

# Or enable via console:
# - Authentication (Email/Password provider)
# - Firestore Database (test mode)
# - Storage (test mode)
```

### 3. Get Configuration
```bash
# Get config via CLI
firebase apps:sdkconfig web

# Or from Firebase Console:
# Project Settings → General → Your apps → Config
```

## Environment Configuration

Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data - owner only
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Profiles - read public, write authenticated
    match /profiles/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Votes - authenticated users only
    match /votes/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        resource.size < 50 * 1024 * 1024; // 50MB limit
    }
  }
}
```