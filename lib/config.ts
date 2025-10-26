// Dropbox Automation Service Configuration

export const DROPBOX_CONFIG = {
  // Dropbox API Token (from environment or hardcoded for demo)
  ACCESS_TOKEN: process.env.DROPBOX_ACCESS_TOKEN || 'sl.u.AGHwc6i8fwaqbJyO3EEryBgFgxPNf5E-yhfypTTyGVUxu3iklJq64Z8ilqBZjcKsXzx1skAlpAZluCoxE6EF-IV0JCqZlaRhpMEUEqykFK2OJc9J70GRfi6VdAh_aQLrhQWp7H7vdHm2kvYspVJ70JGBq3qTcs0szYqBvPbvlWc2Knr8ylUQyAwSHsz-_K_U95VtOKfq_SDymoiSIf3R_8-hnxqWJAh6tlUJJM9lLXP-8RIV3A20YI3PMaCvBDcZ3tvgLoctCJzg4Q7aD-oFv3e4srmyzYJOIyLnXU6USRVrQxDpXc1c91bWY99LYzG9uCrE4NIIKh6tOD3HVNWbIOvOqi1Cp4qyCZzS9ZXAbyxJSY9tGjqJpadINx5OQk1q85Yrt9vJfeK3GcIw5nbJouSUcqIAXPXtfdlAQXrMTB2FLNi-xdpokiKh8GsUJFmTBUpsbcoMgo43uj29di80Uc7YBqoOzw64-pcM_smHcqNu6V1YMu2sgzn1-ekewetzxaJmRKfE_YEkivgOCrZlgycSEqXoFS_vt2kxbJsADyx-zNObGu4yCbYrWDHoav4I7tvgFP2eCMPvCwOjVPJ50-14d0MZJxOvaIv8xiIBvGqv6hC-Cx-IR3xnRJHFyCcz-q4EgLwurrae3JqpwUd2hr51J7bQ_rXslUqsLflWJ2diNH2MSbENu80VUU6MH-s910Bx7JZXGDx-6piarFH0QrfPBZ-NuGYf03u3_vVf1iGPR_-26OiGTEBrFYsEx9mL-S2YT2GquJ3kvPXQVF-qxbbVuq2pbxroWVlQCYT-ANghuAeHO0lZSBCzX65s61ZRcpzjBYTZFv4P_24Ts-1HDtDOVL0aeZaji0SelKOnfzNjNGec_nMIR-xoeXDKCV_VXlF78SeSKRMGjyFVE3oWD5h2zSGwrMrSHgWlygKQ9InyPhOusR6J5J4mEZ6mL9KzC8tTDjIbI7_Jqky5bdyhgau7_KLqsvcM-rQQzwjGyl1FYEFrlubZmdm6Ph94LQM64wG6T7zeNWw8YXGXazKU-0l8eE-BYFrHgy6GNI2vrJl_igmZ-J8WiUmFhIbAX-BPngU-5uKWCqqaTThlKsreqC0oRaWCxcU-g90-qLIVOMHJPspuDG5NtnwM-P5IkpjE3mbfJzARiplMisw7JNkT6Qbu3C16QBLo6zZ6Wuzm7cm2U9nb3OKrzXbLjlCTa6q6Rxz9ifknNgPr-miJImgW5IDsQ_o4wz5Q6w0GQzBO8KRD0BRjoDp4Tn_xAn_d2QODRlQBkfc1A4IvYcJD0HEDjkm2Rdf3Zzv-p7MqFVT4C0CSNNXlbiuCGFyLGhqDKjrn_KmnbEheagaaASpIE0_YQrCIiEqm9BWPgYsCeq-SInm3vECl_3JEnk2wK9U3FLr4SEQ5Yzodz485M6aOEjAbiQhQZAAYaKhJb_NcrFiSogsS0Q',
  
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
  
  if (!DROPBOX_CONFIG.ACCESS_TOKEN || DROPBOX_CONFIG.ACCESS_TOKEN.length < 10) {
    errors.push('Invalid Dropbox access token')
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
