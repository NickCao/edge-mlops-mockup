# MLOps Frontend - GitHub Pages Deployment

This document explains how to deploy the MLOps Frontend to GitHub Pages using GitHub Actions.

## 🚀 Deployment Setup

The repository is now configured with automated GitHub Actions deployment. Follow these steps to enable GitHub Pages:

### 1. Repository Settings
1. Go to your GitHub repository: `https://github.com/NickCao/edge-mlops-mockup`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 2. Push Changes to Trigger Deployment
```bash
# Push the current changes to trigger the workflow
git push origin master
```

### 3. Monitor Deployment
1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow named "Deploy MLOps Frontend to GitHub Pages"
3. Click on the running workflow to monitor progress

### 4. Access Your Deployed Site
Once deployment is complete, your site will be available at:
**https://nickcao.github.io/edge-mlops-mockup/**

## 🔧 How It Works

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` file contains the automated deployment pipeline:

1. **Build Stage**:
   - Sets up Bun runtime
   - Installs dependencies with `bun install --frozen-lockfile`
   - Builds the production app with `bun run build`
   - Uploads build artifacts

2. **Deploy Stage**:
   - Deploys the built artifacts to GitHub Pages
   - Makes the site available at your GitHub Pages URL

### Configuration Details

- **Base Path**: Configured for `/edge-mlops-mockup/` in production
- **Build Output**: `dist/` directory contains all static assets
- **Automatic Triggers**: Deploys on every push to `master` branch
- **Package Manager**: Uses Bun for faster package installation
- **Node Environment**: Sets `NODE_ENV=production` for optimized builds

## 🎯 Features Deployed

The deployed MLOps Platform includes:

### For Data Scientists:
- **Dashboard**: Experiment tracking and dataset overview
- **Datasets**: Comprehensive dataset repository with quality metrics

### For AI Engineers:
- **Models**: Versioned model management with publish/unpublish controls
- **Evaluations**: Detailed evaluation reports with metrics and recommendations
- **Evaluation Modal**: Interactive evaluation setup with dataset selection

### Shared Features:
- **Datasets Repository**: Shared between Data Scientists and AI Engineers
- **Professional UI**: PatternFly design system for enterprise users
- **Responsive Design**: Works on desktop and mobile devices

## 🔄 Continuous Deployment

Every time you push changes to the `master` branch:
1. GitHub Actions automatically builds the app
2. Runs the production build process
3. Deploys to GitHub Pages
4. Your changes are live within 2-3 minutes

## 📊 Performance
- **Build Time**: ~30 seconds
- **Deployment Time**: ~1-2 minutes  
- **Bundle Size**: Optimized for production with code splitting
- **Assets**: Includes all PatternFly fonts and icons

## 🛠 Troubleshooting

If deployment fails:
1. Check the **Actions** tab for error details
2. Ensure GitHub Pages is set to "GitHub Actions" source
3. Verify repository permissions allow GitHub Actions
4. Check that all dependencies are properly listed in package.json

## 📝 Manual Build (Optional)

To build locally:
```bash
bun install
bun run build
bun run preview  # Test production build locally
```

The built files will be in the `dist/` directory.
