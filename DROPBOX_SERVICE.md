# 🚀 Dropbox Automation Service

A fully automated backend service that downloads files from a Dropbox folder called "main/" and saves them locally. This service runs automatically in the background and provides a web dashboard for monitoring and control.

## ✨ Features

- **🔄 Automatic Downloads**: Downloads files from Dropbox `main/` folder every 30 minutes
- **📁 Local Storage**: Saves files to `./public/dropbox-downloads/` directory
- **🧹 Auto Cleanup**: Removes old files after 24 hours
- **📊 Dashboard**: Web interface to monitor and control the service
- **⚙️ Manual Control**: Trigger downloads and cleanup manually
- **📱 Mobile Optimized**: Responsive dashboard design
- **🔒 Secure**: Uses Dropbox API with proper authentication

## 🛠️ Setup

### 1. Environment Configuration

The service uses the provided Dropbox access token. No additional setup required!

### 2. API Endpoints

- `GET /api/dropbox?action=list` - List files in main/ folder
- `GET /api/dropbox?action=status` - Get download status
- `POST /api/dropbox` - Download files or cleanup
- `GET /api/scheduler?action=status` - Get scheduler status
- `POST /api/scheduler` - Control scheduler (start/stop/restart)

### 3. Dashboard Access

Visit `/dropbox-dashboard` to access the web interface.

## 🎯 How It Works

### Automatic Service
1. **Scheduler**: Runs every 30 minutes automatically
2. **File Detection**: Lists all files in Dropbox `main/` folder
3. **Download**: Downloads each file to local storage
4. **Cleanup**: Removes files older than 24 hours
5. **Logging**: Comprehensive logging for monitoring

### Manual Control
- **Download All**: Manually trigger download of all files
- **Cleanup**: Remove old files manually
- **Start/Stop**: Control the automatic scheduler
- **Status**: Monitor service status and statistics

## 📊 Dashboard Features

### Status Cards
- **Dropbox Files**: Number of files in main/ folder
- **Downloaded Files**: Number of files downloaded locally
- **Scheduler Status**: Whether automatic service is running

### Control Panel
- **Download All**: Download all files immediately
- **Cleanup Old**: Remove old files
- **Start Scheduler**: Enable automatic downloads
- **Stop Scheduler**: Disable automatic downloads

### File Management
- **File List**: View all files in Dropbox main/ folder
- **Download Status**: See which files have been downloaded
- **File Details**: Size, modification date, and path information

## 🔧 Configuration

### Scheduler Settings
```typescript
DOWNLOAD_INTERVAL: 30 minutes    // How often to check for new files
CLEANUP_INTERVAL: 24 hours       // How often to clean up old files
MAX_FILE_AGE: 24 hours         // How long to keep downloaded files
```

### File Storage
```
Download Directory: ./public/dropbox-downloads/
Target Folder: /main (in Dropbox)
```

## 📱 Mobile Support

The dashboard is fully responsive and optimized for mobile devices:
- Touch-friendly controls
- Responsive grid layouts
- Mobile-optimized navigation
- Fast loading on mobile networks

## 🔒 Security

- **API Authentication**: Uses secure Dropbox API tokens
- **Rate Limiting**: Built-in delays to prevent API abuse
- **Error Handling**: Comprehensive error handling and logging
- **File Validation**: Validates file types and sizes

## 📈 Monitoring

### Real-time Status
- Live file counts
- Download progress
- Scheduler status
- Error notifications

### Logging
- Download success/failure
- File cleanup operations
- Scheduler events
- Error tracking

## 🚀 Usage Examples

### Start the Service
```bash
# The service starts automatically in production
# Or visit /dropbox-dashboard and click "START SCHEDULER"
```

### Manual Download
```bash
curl -X POST http://localhost:3000/api/dropbox \
  -H "Content-Type: application/json" \
  -d '{"action": "download"}'
```

### Check Status
```bash
curl http://localhost:3000/api/dropbox?action=status
```

## 🎨 Design

The service integrates seamlessly with the Crypto Club 69 design:
- **Retro-futuristic** aesthetic
- **Matrix-inspired** colors
- **Professional** trading interface
- **Mobile-first** responsive design

## 🔄 Automation Flow

1. **Service Startup**: Automatically starts in production
2. **File Detection**: Scans Dropbox main/ folder every 30 minutes
3. **Download Process**: Downloads new files to local storage
4. **Cleanup Process**: Removes old files every 24 hours
5. **Status Updates**: Updates dashboard with real-time information

## 📋 File Management

### Supported File Types
- All file types supported by Dropbox
- Automatic file type detection
- Size and metadata tracking

### Storage Management
- Automatic directory creation
- File conflict resolution
- Storage space monitoring
- Cleanup of old files

## 🎯 Benefits

- **Fully Automated**: No manual intervention required
- **Reliable**: Built-in error handling and retry logic
- **Professional**: Professional-grade service with monitoring
- **Scalable**: Handles large numbers of files efficiently
- **Secure**: Secure API integration with proper authentication

---

**🚀 The Dropbox Automation Service is now fully integrated into Crypto Club 69!**

Visit `/dropbox-dashboard` to start using the service.
