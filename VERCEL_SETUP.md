# 🚀 Vercel Deployment Setup Guide

## 🔐 Setting Up Dropbox API Token on Vercel

To make the Dropbox download work on Vercel, you need to add your environment variable:

### Step 1: Get Your Dropbox Token
1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Find your app or create a new one
3. Go to "Settings" tab
4. Copy your "Access token"

### Step 2: Add Environment Variable to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `crypto-club-69`
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Click **"Add New"**
6. Fill in:
   - **Name**: `DROPBOX_ACCESS_TOKEN`
   - **Value**: `your_actual_dropbox_token_here`
   - **Environment**: Select all (Production, Preview, Development)
7. Click **"Save"**

#### Option B: Via Vercel CLI
```bash
vercel env add DROPBOX_ACCESS_TOKEN
# Enter your token when prompted
```

### Step 3: Redeploy
After adding the environment variable:
1. Go to your project dashboard
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on the latest deployment
4. Or push a new commit to trigger automatic deployment

## 🔍 How to Verify It's Working

### Check Build Logs
1. Go to your Vercel project
2. Click on the latest deployment
3. Look for these logs:
```
🚀 Dropbox Build Download Script
📅 Downloading all files during build process
📋 Found 54 files in main/ folder
📦 Downloading all 54 files...
✅ [1/54] Downloaded: photo1.jpg
...
🎉 Download complete: 54 successful, 0 failed
```

### If Environment Variable is Missing
You'll see:
```
❌ Error: DROPBOX_ACCESS_TOKEN environment variable is not set!
⚠️ Skipping Dropbox download during build...
```

## 🛠️ Troubleshooting

### Problem: "Environment variable not set"
**Solution**: Make sure you added `DROPBOX_ACCESS_TOKEN` to Vercel environment variables

### Problem: "Authentication failed"
**Solution**: 
1. Check your Dropbox token is correct
2. Make sure your Dropbox app has proper permissions
3. Regenerate the token if needed

### Problem: "Build timeout"
**Solution**: 
1. The download might take time for many files
2. Vercel has a 15-minute build limit
3. Consider reducing the number of files or optimizing

## 📋 Current Configuration

Your project is already configured to:
- ✅ Run download script during build (`npm run vercel-build`)
- ✅ Handle missing environment variables gracefully
- ✅ Download files before building the app
- ✅ Work on both local and Vercel builds

## 🎯 Next Steps

1. **Add the environment variable** to Vercel (see Step 2 above)
2. **Redeploy** your project
3. **Check the build logs** to verify it's working
4. **Your Dropbox files will be automatically downloaded** on every deployment!

## 🔗 Useful Links

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Dropbox App Console](https://www.dropbox.com/developers/apps)
- [Your Vercel Project](https://vercel.com/dashboard)
