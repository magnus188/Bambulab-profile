# Preview Deployments for Contributors

This project uses Vercel for automatic preview deployments, making it easy for contributors to share their work and for maintainers to review changes. When you submit a pull request, you'll automatically get a live preview URL to test your changes.

## ✨ What Contributors Get

- 🚀 **Automatic preview URLs** for every pull request
- 🔄 **Live updates** when you push new commits to your PR
- 🧪 **Pre-deployment validation** (automated tests + builds)
- 💬 **PR comments** with direct links to preview your changes
- 📊 **Performance monitoring** with Lighthouse audits
- 🌍 **Global CDN** for fast loading worldwide

## � How It Works for Contributors

### When You Create a Pull Request:
1. 🔄 GitHub Actions automatically triggers
2. 🧪 Runs tests and TypeScript checks on your code
3. 🏗️ Builds the Next.js application with your changes
4. 🚀 Deploys to a unique Vercel preview environment
5. 📊 Runs Lighthouse performance audit
6. 💬 Comments on your PR with the preview URL

### When You Update Your PR:
1. 🔄 Push commits to your branch
2. 🔄 Preview deployment updates automatically
3. 💬 Same preview URL continues to work with your latest changes

### Preview URL Pattern:
Your preview will be available at:
`https://bambulab-profile-git-[your-branch-name]-[project-owner].vercel.app`

## 🧪 Testing Your Changes

Use the preview deployment to:
- ✅ **Test your features** in a production-like environment
- ✅ **Share with others** for feedback before final review
- ✅ **Verify responsive design** across different devices
- ✅ **Test Firebase integration** (if you've set up your own Firebase project)
- ✅ **Check performance** with the included Lighthouse audit

## 📋 What Gets Tested Automatically

Before your preview is deployed, the system automatically runs:

```bash
npm run lint:ci      # Code style and quality checks
npm run type-check   # TypeScript validation
npm run test:ci      # Unit test suite with coverage
npm run build        # Production build verification
```

If any of these fail, the preview deployment won't happen, and you'll see the error details in the GitHub Actions logs.

## 🔧 For Fork Maintainers

If you're maintaining a fork of this project and want preview deployments for your contributors:

### 1. Set Up Vercel Account
- Sign up at [vercel.com](https://vercel.com) with your GitHub account
- Import your forked repository
- Deploy it once to create the project

### 2. Get Required Credentials
After your initial deployment:

**Vercel Token:**
- Go to Vercel Dashboard → Settings → Tokens
- Create a token named "GitHub Actions"
- Copy the token value

**Project IDs:**
```bash
# In your local project directory
npx vercel
# Follow prompts to link your project
# Check the generated file:
cat .vercel/project.json
```

### 3. Configure GitHub Secrets
In your repository: Settings → Secrets and variables → Actions

Add these secrets:
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id_from_project_json  
VERCEL_PROJECT_ID=your_project_id_from_project_json
```

### 4. Test with a PR
Create a test pull request to verify everything works!

## 🐛 Troubleshooting for Contributors

### Preview Not Deploying?
1. **Check GitHub Actions** - Look at the Actions tab in your PR for error details
2. **Verify tests pass locally** - Run `npm run ci` to check if tests pass on your machine
3. **Check build succeeds** - Ensure `npm run build` works without errors

### Build Errors?
- Make sure all your changes follow TypeScript requirements
- Verify you haven't introduced linting errors
- Check that all imports and dependencies are correct

### Firebase Errors in Preview?
- Preview deployments use the production Firebase configuration
- Some features might not work if they require specific Firebase setup
- Focus on testing UI/UX changes rather than full Firebase functionality

## 🌟 Benefits for the Project

Preview deployments help the project by:
- **Faster reviews** - Maintainers can see changes live
- **Better testing** - Multiple people can test changes before merge
- **Improved quality** - Catch visual and functional issues early
- **Community engagement** - Easy for community members to preview and provide feedback

## 💡 Tips for Contributors

1. **Share your preview URL** when asking for feedback on issues or discussions
2. **Test thoroughly** before requesting review - use the preview to verify everything works
3. **Check mobile** - Test your changes on different screen sizes using the preview
4. **Performance matters** - Use the Lighthouse results to ensure your changes don't slow things down

---

Preview deployments make contributing easier and more collaborative. Every change gets its own staging environment, so you can confidently share your work and get feedback before it goes live! 🚀

