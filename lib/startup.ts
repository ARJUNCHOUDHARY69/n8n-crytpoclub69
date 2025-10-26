// Startup script for Dropbox background service
import { startBackgroundService } from './background-service'
import { validateConfig } from './config'

// Initialize the Dropbox background service
export function initializeDropboxService() {
  console.log('🚀 Initializing Dropbox Background Service...')
  
  // Validate configuration
  const configValidation = validateConfig()
  if (!configValidation.isValid) {
    console.error('❌ Configuration validation failed:')
    configValidation.errors.forEach(error => console.error(`  - ${error}`))
    return false
  }
  
  console.log('✅ Configuration validated successfully')
  
  // Start the background service
  try {
    startBackgroundService()
    console.log('✅ Dropbox background service initialized successfully')
    return true
  } catch (error) {
    console.error('❌ Failed to initialize Dropbox service:', error)
    return false
  }
}

// Auto-initialize in production
if (process.env.NODE_ENV === 'production') {
  // Wait for app to be ready
  setTimeout(() => {
    initializeDropboxService()
  }, 10000) // 10 seconds delay
}
