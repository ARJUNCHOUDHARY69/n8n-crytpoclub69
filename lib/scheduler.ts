import { downloadAllFilesFromMain, cleanupOldFiles } from './dropbox-service'

// Scheduler configuration
const DOWNLOAD_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const CLEANUP_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const MAX_FILE_AGE_HOURS = 25 // Keep files for 25 hours

// Global scheduler state
let downloadInterval: NodeJS.Timeout | null = null
let cleanupInterval: NodeJS.Timeout | null = null
let isRunning = false

// Function to perform automatic download
async function performAutomaticDownload() {
  try {
    console.log('⏰ [SCHEDULER] Starting automatic download...')
    const startTime = Date.now()
    
    const result = await downloadAllFilesFromMain()
    const duration = Date.now() - startTime
    
    if (result.success) {
      console.log(`✅ [SCHEDULER] Download completed in ${duration}ms: ${result.downloaded} files downloaded, ${result.failed} failed`)
    } else {
      console.error('❌ [SCHEDULER] Download failed')
    }
    
    return result
  } catch (error) {
    console.error('❌ [SCHEDULER] Error in automatic download:', error)
    return {
      success: false,
      downloaded: 0,
      failed: 0,
      files: []
    }
  }
}

// Function to perform automatic cleanup
async function performAutomaticCleanup() {
  try {
    console.log('🧹 [SCHEDULER] Starting automatic cleanup...')
    const cleaned = await cleanupOldFiles(MAX_FILE_AGE_HOURS)
    console.log(`✅ [SCHEDULER] Cleanup completed: removed ${cleaned} old files`)
    return cleaned
  } catch (error) {
    console.error('❌ [SCHEDULER] Error in automatic cleanup:', error)
    return 0
  }
}

// Start the scheduler
export function startScheduler() {
  if (isRunning) {
    console.log('⚠️ [SCHEDULER] Scheduler is already running')
    return
  }
  
  console.log('🚀 [SCHEDULER] Starting automated Dropbox service...')
  console.log(`📅 [SCHEDULER] Download interval: ${DOWNLOAD_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📅 [SCHEDULER] Cleanup interval: ${CLEANUP_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📅 [SCHEDULER] Max file age: ${MAX_FILE_AGE_HOURS} hours`)
  
  isRunning = true
  
  // Start download interval
  downloadInterval = setInterval(async () => {
    await performAutomaticDownload()
  }, DOWNLOAD_INTERVAL)
  
  // Start cleanup interval
  cleanupInterval = setInterval(async () => {
    await performAutomaticCleanup()
  }, CLEANUP_INTERVAL)
  
  // Perform initial download immediately
  setTimeout(async () => {
    console.log('🎯 [SCHEDULER] Performing initial download...')
    await performAutomaticDownload()
  }, 5000) // Wait 5 seconds after startup
  
  console.log('✅ [SCHEDULER] Scheduler started successfully')
}

// Stop the scheduler
export function stopScheduler() {
  if (!isRunning) {
    console.log('⚠️ [SCHEDULER] Scheduler is not running')
    return
  }
  
  console.log('🛑 [SCHEDULER] Stopping automated Dropbox service...')
  
  if (downloadInterval) {
    clearInterval(downloadInterval)
    downloadInterval = null
  }
  
  if (cleanupInterval) {
    clearInterval(cleanupInterval)
    cleanupInterval = null
  }
  
  isRunning = false
  console.log('✅ [SCHEDULER] Scheduler stopped')
}

// Get scheduler status
export function getSchedulerStatus() {
  return {
    isRunning,
    downloadInterval: DOWNLOAD_INTERVAL / 1000 / 60 / 60, // hours
    cleanupInterval: CLEANUP_INTERVAL / 1000 / 60 / 60, // hours
    maxFileAge: MAX_FILE_AGE_HOURS, // hours
    nextDownload: downloadInterval ? 'Active' : 'Inactive',
    nextCleanup: cleanupInterval ? 'Active' : 'Inactive'
  }
}

// Manual trigger functions
export async function triggerDownload() {
  console.log('🎯 [MANUAL] Triggering manual download...')
  return await performAutomaticDownload()
}

export async function triggerCleanup() {
  console.log('🧹 [MANUAL] Triggering manual cleanup...')
  return await performAutomaticCleanup()
}

// Auto-start scheduler when module is imported (for production)
if (process.env.NODE_ENV === 'production') {
  // Start scheduler after a short delay to ensure app is ready
  setTimeout(() => {
    startScheduler()
  }, 10000) // 10 seconds delay
}
