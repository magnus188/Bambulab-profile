# Firebase Setup for Contributors

This guide helps contributors set up their own Firebase backend for local development and testing. Since this project uses Firebase for authentication and data storage, you'll need your own Firebase project to contribute effectively.

## 🔧 Setting Up Your Firebase Project

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Follow the setup wizard:
   - Choose a project name (e.g., "bambulab-profiles-dev")
   - Choose whether to enable Google Analytics (optional for development)

### 2. Enable Required Services

#### Authentication
1. In your Firebase console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Optionally enable **Google** provider if you want to test OAuth

#### Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **test mode** (you can configure security rules later)
4. Choose a location close to you

#### Storage
1. Go to **Storage**
2. Click **Get started**
3. Start in **test mode**
4. Use the same location as your Firestore database

### 3. Get Your Configuration

1. In your Firebase console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → **Web app** (</> icon)
4. Register your app with a nickname (e.g., "development")
5. Copy the configuration object - you'll need these values

## 🔑 Local Development Setup

### 1. Environment Configuration

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Security Rules (Optional but Recommended)

For a better development experience, you may want to set up basic security rules:

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow read access to profiles, write for authenticated users
    match /profiles/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 For Contributors Deploying Forks

If you're deploying your own version of this project, here's how to set up environment variables:

### Vercel Deployment

#### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Set environment variables for your deployment
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

#### Option 2: Vercel Dashboard
1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Settings** → **Environment Variables**
3. Add each variable with your Firebase configuration values

### Other Platforms

The same environment variables work for other deployment platforms like:
- **Netlify**: Add in Site Settings → Environment Variables
- **Railway**: Add in Variables tab
- **Heroku**: Use `heroku config:set` or dashboard

## 🔧 Troubleshooting

### Common Issues

**Firebase: Error (auth/invalid-api-key)**
- Double-check all environment variable names and values
- Ensure your Firebase project is active and not deleted
- Verify you're using the correct Firebase project configuration

**Firestore permission errors**
- Make sure Firestore is enabled in your Firebase project
- Check your security rules if you've customized them
- Ensure your authentication is working correctly

**Storage upload failures**
- Verify Firebase Storage is enabled
- Check your storage security rules
- Make sure the storage bucket name matches your configuration

### Development Tips

- Use Firebase Local Emulator Suite for offline development:
  ```bash
  npm install -g firebase-tools
  firebase init emulators
  firebase emulators:start
  ```
- Monitor your Firebase usage in the console to avoid hitting free tier limits
- Set up billing alerts if you expect higher usage during development

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js with Firebase Guide](https://nextjs.org/learn/react-foundations)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

Need help with Firebase setup? Feel free to open an issue or ask in the project discussions!
