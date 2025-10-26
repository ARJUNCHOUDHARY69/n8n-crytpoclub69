# 🔑 Dropbox Token Setup Guide

## ❌ Current Issue: Expired Access Token

Your Dropbox access token has expired. Here's how to fix it:

## 🚀 Quick Fix Steps:

### 1. Get New Dropbox Token
1. Go to: https://www.dropbox.com/developers/apps
2. Click "Create app" or use existing app
3. Choose "Scoped access" → "Full Dropbox access"
4. Generate access token
5. Copy the token

### 2. Update Environment File
Create/update `.env.local`:
```bash
DROPBOX_ACCESS_TOKEN=your_new_token_here
```

### 3. Restart Server
```bash
npm run dev
```

## 🔧 Token Requirements:
- **Scopes needed**: `files.metadata.read`, `files.content.read`
- **Access level**: Full Dropbox access
- **Token type**: Long-lived access token

## ✅ Test Your Token:
Visit: `http://localhost:3000/api/dropbox-service?action=status`

## 🚨 Common Issues:
- **401 Unauthorized**: Token expired or invalid
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: App not configured properly

## 💡 Pro Tips:
- Use long-lived tokens for production
- Store tokens securely in environment variables
- Test token validity before deployment
