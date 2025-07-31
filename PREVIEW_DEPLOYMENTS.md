# PR Preview Deployments with Vercel

This project uses Vercel for automatic preview deployments on pull requests. Vercel's free tier is perfect for open source projects like this one.

## ✨ What You Get

- 🚀 **Automatic preview URLs** for every PR
- 🔄 **Real-time updates** when you push new commits
- 🧪 **Pre-deployment testing** (tests + type checking)
- 💬 **Auto-comments** with preview links on PRs
- 📊 **Lighthouse performance audits**
- 🌍 **Global CDN** with excellent performance

## 🚀 Quick Setup (5 minutes)

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with your GitHub account

### 2. Connect Your Repository
- Click "New Project" in Vercel dashboard
- Import your `Bambulab-profile` repository
- Vercel will auto-detect it's a Next.js project
- Click "Deploy" (this creates your production site)

### 3. Get Your Vercel Credentials
After deployment, you need to get these values:

**Get your Vercel Token:**
- Go to Vercel Dashboard → Settings → Tokens
- Create new token with name "GitHub Actions"
- Copy the token

**Get your Project and Org IDs:**
```bash
# In your project directory
npx vercel
# Follow the prompts to link your project
# Then check the .vercel/project.json file:
cat .vercel/project.json
```

### 4. Add GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these three secrets:
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_from_project_json
VERCEL_PROJECT_ID=your_project_id_from_project_json
```

### 5. Test It!
Create a test PR:
```bash
git checkout -b test-preview
echo "<!-- Test change -->" >> README.md
git add .
git commit -m "test: preview deployment"
git push origin test-preview
```

Then create a PR and watch the magic happen! 🎉

## 📋 How It Works

### When you create a PR:
1. 🔄 GitHub Actions workflow triggers
2. 🧪 Runs all tests and type checking
3. 🏗️ Builds your Next.js application
4. 🚀 Deploys to Vercel preview environment
5. � Runs Lighthouse performance audit
6. �💬 Comments on PR with preview URL

### When you push new commits:
1. 🔄 Workflow runs again automatically
2. 🔄 Updates the existing preview deployment
3. 💬 Updates the PR comment with same URL

### Preview URL Format:
`https://bambulab-profile-git-[branch-name]-[your-username].vercel.app`

## 🔧 Vercel Free Tier Limits

Perfect for open source projects:
- ✅ **100GB bandwidth/month** (plenty for a portfolio site)
- ✅ **100 deployments/day** (way more than you'll need)
- ✅ **Unlimited preview deployments**
- ✅ **Global CDN included**
- ✅ **Automatic HTTPS**
- ✅ **Core Web Vitals monitoring**

## 🐛 Troubleshooting

### "Secrets not found" error:
- Double-check secret names match exactly: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- Make sure you're adding them as "Actions secrets", not "Dependabot secrets"

### Build failures:
- Ensure `npm run build` works locally
- Check the Actions tab for detailed error logs
- Verify all dependencies are in package.json

### Vercel deployment issues:
- Check Vercel dashboard for deployment logs
- Ensure your repository is properly connected to Vercel
- Try redeploying from Vercel dashboard

### Getting your IDs:
If you can't find your project.json file:
```bash
# Make sure you're in the right directory
cd "/path/to/your/bambulab-profile"

# Link to Vercel (if not already linked)
npx vercel --confirm

# Check the generated file
cat .vercel/project.json
```

## 🌟 Pro Tips

1. **Environment Variables**: Add any needed env vars in Vercel dashboard → Project Settings → Environment Variables

2. **Custom Domains**: You can add a custom domain in Vercel for your main site (previews will still use vercel.app subdomains)

3. **Performance**: Vercel automatically optimizes your Next.js app with their Edge Network

4. **Analytics**: Enable Vercel Analytics in your dashboard for detailed performance insights

## 🎯 What's Next?

Once set up, your workflow is:
1. Create feature branch
2. Make changes
3. Push and create PR
4. Get instant preview URL
5. Share with reviewers
6. Merge when ready!

The preview deployments make code reviews so much better - reviewers can actually see and test your changes live! 🚀
