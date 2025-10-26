// Dropbox Automation Service Configuration

export const DROPBOX_CONFIG = {
  // Dropbox API Token (from environment variable)
  ACCESS_TOKEN: process.env.DROPBOX_ACCESS_TOKEN,
  
  // API Endpoints
  API_BASE: 'https://api.dropboxapi.com/2',
  CONTENT_BASE: 'https://content.dropboxapi.com/2',
  
  // Target folder in Dropbox
  MAIN_FOLDER_PATH: '/main',
  
  // Local storage configuration
  DOWNLOAD_DIR: './public/dropbox-downloads',
  
  // Rate limiting
  RATE_LIMIT_DELAY: 100, // ms between downloads
}

export const SCHEDULER_CONFIG = {
  // Intervals (in milliseconds)
  DOWNLOAD_INTERVAL: parseInt(process.env.DOWNLOAD_INTERVAL_MINUTES || '30') * 60 * 1000, // 30 minutes
  CLEANUP_INTERVAL: parseInt(process.env.CLEANUP_INTERVAL_HOURS || '24') * 60 * 60 * 1000, // 24 hours
  
  // File management
  MAX_FILE_AGE_HOURS: parseInt(process.env.MAX_FILE_AGE_HOURS || '24'), // 24 hours
  
  // Auto-start in production
  AUTO_START: process.env.NODE_ENV === 'production',
}

export const NOTIFICATION_CONFIG = {
  // Telegram notifications (optional)
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  
  // Notification settings
  NOTIFY_ON_DOWNLOAD: true,
  NOTIFY_ON_ERROR: true,
  NOTIFY_ON_CLEANUP: false,
}

// Utility function to get configuration
export function getConfig() {
  return {
    dropbox: DROPBOX_CONFIG,
    scheduler: SCHEDULER_CONFIG,
    notifications: NOTIFICATION_CONFIG,
  }
}

// Validation function
export function validateConfig() {
  const errors: string[] = []
  
  if (!DROPBOX_CONFIG.ACCESS_TOKEN) {
    errors.push('DROPBOX_ACCESS_TOKEN environment variable is not set')
  } else if (DROPBOX_CONFIG.ACCESS_TOKEN.length < 10) {
    errors.push('Invalid Dropbox access token format')
  }
  
  if (SCHEDULER_CONFIG.DOWNLOAD_INTERVAL < 60000) {
    errors.push('Download interval too short (minimum 1 minute)')
  }
  
  if (SCHEDULER_CONFIG.MAX_FILE_AGE_HOURS < 1) {
    errors.push('Max file age too short (minimum 1 hour)')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
