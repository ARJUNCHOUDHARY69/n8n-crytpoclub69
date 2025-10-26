# 🚀 Quick Dropbox Setup

## ❌ Current Issue: No Dropbox Token

Your Dropbox service is not working because there's no access token configured.

## ✅ Quick Fix:

### 1. Get Dropbox Token
1. Go to: https://www.dropbox.com/developers/apps
2. Click "Create app"
3. Choose "Scoped access" → "Full Dropbox access"
4. Generate access token
5. Copy the token

### 2. Create Environment File
Create `.env.local` in your project root:
```bash
DROPBOX_ACCESS_TOKEN=your_token_here
```

### 3. Restart Server
```bash
npm run dev
```

### 4. Test Service
Visit: `http://localhost:3000/api/check-token`

## 🎯 Expected Result:
```
✅ CHECK TOKEN: Token is valid!
📧 Account: your@email.com
👤 Name: Your Name
```

## 🔧 If Still Not Working:
1. Check token is correct
2. Ensure token has proper permissions
3. Try generating a new token
4. Check `.env.local` file exists

## 📁 Service Features:
- Downloads files from Dropbox `/main` folder
- Caches files for 24 hours
- Saves files to `public/dropbox-files/`
- Automatic cron job every 24 hours
- Manual sync via API endpoints

