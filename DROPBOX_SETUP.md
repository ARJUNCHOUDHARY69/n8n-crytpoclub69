# Dropbox API Setup for Image Gallery

## 🔧 SETUP INSTRUCTIONS:

### **1. CREATE DROPBOX APP:**
1. Go to https://www.dropbox.com/developers/apps
2. Click "Create app"
3. Choose "Scoped access"
4. Select "Full Dropbox" access
5. Name your app (e.g., "Crypto Gallery")
6. Click "Create app"

### **2. GENERATE ACCESS TOKEN:**
1. In your app settings, go to "Permissions" tab
2. Enable "files.metadata.read" and "files.content.read"
3. Go to "Settings" tab
4. Click "Generate access token"
5. Copy the token (you won't see it again!)

### **3. ADD TO ENVIRONMENT:**
Create `.env.local` file in your project root:
```bash
DROPBOX_ACCESS_TOKEN=your_actual_token_here
```

### **4. AUTOMATIC STARTUP:**
The system will automatically:
- ✅ Download files from `/main` folder on website startup
- ✅ Cache files locally for 2 hours
- ✅ Auto-refresh cache every 1.5 hours
- ✅ Work offline with cached files
- ✅ Clean up expired cache automatically

### **5. CREATE DROPBOX FOLDER:**
1. Create a folder called `main` in your Dropbox
2. Upload your files to this folder
3. Supported formats: Any file type

### **6. TEST THE SYSTEM:**
1. Start your development server: `npm run dev`
2. Go to `/image-gallery`
3. The system will cache up to 50 images permanently

## 🔒 CACHING SYSTEM:

### **PERMANENT CACHE FEATURES:**
- ✅ **50 Images Max** - Cached permanently in file system
- ✅ **24-Hour Refresh** - Auto-refresh cache daily
- ✅ **Fallback System** - Uses cache if API fails
- ✅ **File System Cache** - Stored in `/cache/images/` directory

### **PERFORMANCE BENEFITS:**
- ✅ **Instant Loading** - Cached images load immediately
- ✅ **No API Calls** - Uses permanent cache for 24 hours
- ✅ **CDN Headers** - 24-hour browser cache
- ✅ **Refresh Button** - Manual cache refresh option

### **SECURITY FEATURES:**
- ✅ **Rate Limit Safe** - Minimal API calls
- ✅ **Vercel Friendly** - File system caching
- ✅ **Error Handling** - Graceful fallbacks
- ✅ **Cache Status** - Shows cache state

## 📁 FOLDER STRUCTURE:
```
/cache/
  /images/
    gallery-cache.json (permanent cache file)
```

## 🚀 DEPLOYMENT:
The cache directory will be created automatically on first run. Make sure to add the `DROPBOX_ACCESS_TOKEN` to your Vercel environment variables for production deployment.
