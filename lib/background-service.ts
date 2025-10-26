// Background Dropbox Service
// Runs independently without frontend

import { downloadAllFilesFromMain, cleanupOldFiles } from './dropbox-service'

// Service configuration
const DOWNLOAD_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const CLEANUP_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const MAX_FILE_AGE_HOURS = 25 // Keep files for 25 hours

let isRunning = false
let downloadTimer: NodeJS.Timeout | null = null
let cleanupTimer: NodeJS.Timeout | null = null

// Background service functions
export function startBackgroundService() {
  if (isRunning) {
    console.log('⚠️ [BACKGROUND] Service is already running')
    return
  }

  console.log('🚀 [BACKGROUND] Starting Dropbox Background Service...')
  console.log(`📅 [BACKGROUND] Download interval: ${DOWNLOAD_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📅 [BACKGROUND] Cleanup interval: ${CLEANUP_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📅 [BACKGROUND] Max file age: ${MAX_FILE_AGE_HOURS} hours`)
  console.log('📁 [BACKGROUND] Target folder: /main')
  console.log('💾 [BACKGROUND] Download directory: ./public/dropbox-downloads/')
  console.log('')

  isRunning = true

  // Start download timer
  downloadTimer = setInterval(async () => {
    console.log('⏰ [BACKGROUND] Starting scheduled download...')
    try {
      const result = await downloadAllFilesFromMain()
      if (result.success) {
        console.log(`✅ [BACKGROUND] Download completed: ${result.downloaded} files downloaded, ${result.failed} failed`)
      } else {
        console.error('❌ [BACKGROUND] Download failed')
      }
    } catch (error) {
      console.error('❌ [BACKGROUND] Download error:', error)
    }
  }, DOWNLOAD_INTERVAL)

  // Start cleanup timer
  cleanupTimer = setInterval(async () => {
    console.log('🧹 [BACKGROUND] Starting scheduled cleanup...')
    try {
      const cleaned = await cleanupOldFiles(MAX_FILE_AGE_HOURS)
      console.log(`✅ [BACKGROUND] Cleanup completed: removed ${cleaned} old files`)
    } catch (error) {
      console.error('❌ [BACKGROUND] Cleanup error:', error)
    }
  }, CLEANUP_INTERVAL)

  // Perform initial download
  setTimeout(async () => {
    console.log('🎯 [BACKGROUND] Performing initial download...')
    try {
      const result = await downloadAllFilesFromMain()
      if (result.success) {
        console.log(`✅ [BACKGROUND] Initial download: ${result.downloaded} files downloaded, ${result.failed} failed`)
      }
    } catch (error) {
      console.error('❌ [BACKGROUND] Initial download error:', error)
    }
  }, 5000) // Wait 5 seconds after startup

  console.log('✅ [BACKGROUND] Background service started successfully')
}

export function stopBackgroundService() {
  if (!isRunning) {
    console.log('⚠️ [BACKGROUND] Service is not running')
    return
  }

  console.log('🛑 [BACKGROUND] Stopping background service...')

  if (downloadTimer) {
    clearInterval(downloadTimer)
    downloadTimer = null
  }

  if (cleanupTimer) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
  }

  isRunning = false
  console.log('✅ [BACKGROUND] Background service stopped')
}

export function getServiceStatus() {
  return {
    isRunning,
    downloadInterval: DOWNLOAD_INTERVAL / 1000 / 60 / 60, // hours
    cleanupInterval: CLEANUP_INTERVAL / 1000 / 60 / 60, // hours
    maxFileAge: MAX_FILE_AGE_HOURS, // hours
    nextDownload: downloadTimer ? 'Active' : 'Inactive',
    nextCleanup: cleanupTimer ? 'Active' : 'Inactive'
  }
}

// Auto-start in production
if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    startBackgroundService()
  }, 10000) // 10 seconds delay
}
