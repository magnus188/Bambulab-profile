# Bambulab Filament Profiles

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

This is a Next.js 14 TypeScript application for sharing and discovering 3D printer filament profiles for Bambulab printers. The app uses Firebase for backend services (Authentication, Firestore, Storage) and is configured for static export deployment.

## Working Effectively

### Bootstrap and Install Dependencies
```bash
npm ci  # Takes ~3 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
```
**TIMING:** Initial npm ci takes approximately 3 minutes. Always use `npm ci` instead of `npm install` for consistent builds.

### Development Commands (All Validated)
```bash
# Development server
npm run dev          # Starts in ~2 seconds. Runs on http://localhost:3000

# Code quality (fast)
npm run lint         # Takes ~2 seconds
npm run lint:ci      # Takes ~2 seconds (CI environment)
npm run type-check   # Takes ~3 seconds

# Testing
npm test             # Interactive test runner (~3 seconds)
npm run test:ci      # With coverage (~4 seconds)

# Building
npm run build        # Takes ~24 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
npm run ci           # Lint + type-check + test:ci (~8 seconds)
npm run ci:full      # npm ci + lint + type-check + build (~37 seconds)
```

### Complete Build Validation
```bash
# Use the comprehensive build script that validates everything
node scripts/build-complete.js  # Takes ~44 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
```

**CRITICAL TIMING NOTES:**
- **NEVER CANCEL** build operations. Build takes ~24 seconds in development, but can take longer in CI.
- Always set timeouts to 60+ minutes for build commands to avoid premature cancellation.
- The comprehensive build script validates: dependencies → lint → type-check → build → tests.

### Production Deployment
This app is configured for **static export** (not traditional Next.js server):
```bash
npm run build        # Generates static files in 'out/' directory
# DO NOT use "npm start" - this fails with static export
# Use a static file server like 'npx serve@latest out' instead
```

### Firebase Configuration (Required for Development)
Create `.env.local` with Firebase project credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
**See FIREBASE_SETUP.md for detailed Firebase project setup instructions.**

## Validation and Testing

### Required Pre-commit Validation
**ALWAYS run this before making any commits:**
```bash
npm run ci  # Runs lint:ci + type-check + test:ci (~8 seconds)
```

### Manual Testing Scenarios
After making changes, **ALWAYS test these key scenarios:**

1. **Development Server Test:**
   - Run `npm run dev`
   - Verify server starts without errors
   - Check that the app loads at http://localhost:3000
   - Verify Firebase connection (may require proper .env.local)

2. **Build Process Test:**
   - Run `npm run build` 
   - Verify build completes without errors
   - Check that `out/` directory contains static files
   - Verify bundle size is reasonable (~300KB)

3. **Test Suite Validation:**
   - Run `npm run test:ci`
   - Verify all 8 test suites pass (17 tests total)
   - Check coverage remains above 30%

### CI/CD Requirements
GitHub Actions CI runs on Node.js 18.x and 20.x. The CI pipeline validates:
- ESLint compliance (`npm run lint`)
- TypeScript validation (`npx tsc --noEmit`)
- Production build (`npm run build`)
- Environment variable requirements for Firebase

## Project Structure and Navigation

### Key Directories
```
src/
├── app/                    # Next.js App Router pages
│   ├── my-profiles/       # User profile management
│   ├── signin/            # Authentication pages
│   └── page.tsx           # Home page
├── components/            # React components (18 TypeScript files total)
├── contexts/              # AuthContext, ThemeContext
├── lib/                   # Firebase configuration
├── services/              # Firebase service layer
├── types/                 # TypeScript definitions
└── utils/                 # Utility functions

__tests__/                 # Jest test files (8 test suites)
scripts/                   # Build automation scripts
.github/workflows/         # CI/CD pipelines
```

### Important Files to Know
- `src/lib/firebase.ts` - Firebase configuration (requires .env.local)
- `src/services/profileService.ts` - Main business logic for profiles
- `src/types/index.ts` - TypeScript definitions for FilamentProfile
- `next.config.js` - Next.js configuration with static export settings
- `scripts/build-complete.js` - Comprehensive build validation script

### Configuration Files
- **TypeScript**: `tsconfig.json` (strict mode enabled)
- **ESLint**: `.eslintrc.json` (extends next/core-web-vitals)
- **Jest**: `jest.config.js` (with jsdom environment)
- **Tailwind**: `tailwind.config.ts` 
- **Next.js**: `next.config.js` (configured for static export)

## Common Tasks and Troubleshooting

### When Making Component Changes
1. Always run `npm run type-check` to verify TypeScript
2. Run `npm run test` to verify existing tests still pass
3. Test the development server: `npm run dev`

### When Modifying Firebase Integration
1. Check `src/lib/firebase.ts` for configuration
2. Update `src/services/profileService.ts` for business logic
3. Verify environment variables in `.env.local`
4. Run tests with `npm run test:ci`

### Build Issues
- **Build fails**: Check TypeScript errors with `npm run type-check`
- **Tests fail**: Run `npm test` for detailed output
- **Lint errors**: Run `npm run lint` and fix reported issues
- **Firebase errors**: Verify `.env.local` configuration

### Performance Notes
- Bundle size should stay around 300KB (monitored in build output)
- Tests should complete in under 5 seconds
- Build should complete in under 30 seconds for local development
- Use `npm ci` for clean dependency installs (~3 minutes)

## Security and Best Practices

### Environment Variables
- **NEVER commit** `.env.local` to version control
- All Firebase config uses `NEXT_PUBLIC_` prefix (client-side)
- Test environment variables are in `.env.local.example` (if available)

### Code Standards
- **TypeScript strict mode** is enabled
- **ESLint** enforces Next.js best practices
- **No console.log** in production code (use proper error handling)
- All components use proper TypeScript interfaces

### Firebase Security
- Security rules are documented in `FIREBASE_SETUP.md`
- Authentication required for write operations
- File uploads limited to 50MB
- Read access is public for profiles, private for user data

---

**This application is production-ready and optimized for static deployment. All commands and timings have been validated.**