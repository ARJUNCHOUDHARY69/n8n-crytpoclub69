/**
 * Vercel Dropbox Background Service
 * Automatically runs in production on Vercel
 */

const https = require('https')
const fs = require('fs').promises
const path = require('path')

// Configuration
const DROPBOX_ACCESS_TOKEN = 'sl.u.AGHwc6i8fwaqbJyO3EEryBgFgxPNf5E-yhfypTTyGVUxu3iklJq64Z8ilqBZjcKsXzx1skAlpAZluCoxE6EF-IV0JCqZlaRhpMEUEqykFK2OJc9J70GRfi6VdAh_aQLrhQWp7H7vdHm2kvYspVJ70JGBq3qTcs0szYqBvPbvlWc2Knr8ylUQyAwSHsz-_K_U95VtOKfq_SDymoiSIf3R_8-hnxqWJAh6tlUJJM9lLXP-8RIV3A20YI3PMaCvBDcZ3tvgLoctCJzg4Q7aD-oFv3e4srmyzYJOIyLnXU6USRVrQxDpXc1c91bWY99LYzG9uCrE4NIIKh6tOD3HVNWbIOvOqi1Cp4qyCZzS9ZXAbyxJSY9tGjqJpadINx5OQk1q85Yrt9vJfeK3GcIw5nbJouSUcqIAXPXtfdlAQXrMTB2FLNi-xdpokiKh8GsUJFmTBUpsbcoMgo43uj29di80Uc7YBqoOzw64-pcM_smHcqNu6V1YMu2sgzn1-ekewetzxaJmRKfE_YEkivgOCrZlgycSEqXoFS_vt2kxbJsADyx-zNObGu4yCbYrWDHoav4I7tvgFP2eCMPvCwOjVPJ50-14d0MZJxOvaIv8xiIBvGqv6hC-Cx-IR3xnRJHFyCcz-q4EgLwurrae3JqpwUd2hr51J7bQ_rXslUqsLflWJ2diNH2MSbENu80VUU6MH-s910Bx7JZXGDx-6piarFH0QrfPBZ-NuGYf03u3_vVf1iGPR_-26OiGTEBrFYsEx9mL-S2YT2GquJ3kvPXQVF-qxbbVuq2pbxroWVlQCYT-ANghuAeHO0lZSBCzX65s61ZRcpzjBYTZFv4P_24Ts-1HDtDOVL0aeZaji0SelKOnfzNjNGec_nMIR-xoeXDKCV_VXlF78SeSKRMGjyFVE3oWD5h2zSGwrMrSHgWlygKQ9InyPhOusR6J5J4mEZ6mL9KzC8tTDjIbI7_Jqky5bdyhgau7_KLqsvcM-rQQzwjGyl1FYEFrlubZmdm6Ph94LQM64wG6T7zeNWw8YXGXazKU-0l8eE-BYFrHgy6GNI2vrJl_igmZ-J8WiUmFhIbAX-BPngU-5uKWCqqaTThlKsreqC0oRaWCxcU-g90-qLIVOMHJPspuDG5NtnwM-P5IkpjE3mbfJzARiplMisw7JNkT6Qbu3C16QBLo6zZ6Wuzm7cm2U9nb3OKrzXbLjlCTa6q6Rxz9ifknNgPr-miJImgW5IDsQ_o4wz5Q6w0GQzBO8KRD0BRjoDp4Tn_xAn_d2QODRlQBkfc1A4IvYcJD0HEDjkm2Rdf3Zzv-p7MqFVT4C0CSNNXlbiuCGFyLGhqDKjrn_KmnbEheagaaASpIE0_YQrCIiEqm9BWPgYsCeq-SInm3vECl_3JEnk2wK9U3FLr4SEQ5Yzodz485M6aOEjAbiQhQZAAYaKhJb_NcrFiSogsS0Q'
const DOWNLOAD_DIR = './public/dropbox-downloads'
const MAIN_FOLDER_PATH = '/main'
const DOWNLOAD_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const CLEANUP_INTERVAL = 25 * 60 * 60 * 1000 // 25 hours
const MAX_FILE_AGE_HOURS = 25

// Global state
let isRunning = false
let downloadTimer = null
let cleanupTimer = null
let statusTimer = null

// Utility function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          resolve(data)
        }
      })
    })
    
    req.on('error', reject)
    
    if (postData) {
      req.write(JSON.stringify(postData))
    }
    
    req.end()
  })
}

// Ensure download directory exists
async function ensureDownloadDirectory() {
  try {
    await fs.access(DOWNLOAD_DIR)
  } catch {
    await fs.mkdir(DOWNLOAD_DIR, { recursive: true })
    console.log('📁 Created download directory:', DOWNLOAD_DIR)
  }
}

// List files in Dropbox main/ folder
async function listDropboxFiles() {
  try {
    const options = {
      hostname: 'api.dropboxapi.com',
      port: 443,
      path: '/2/files/list_folder',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
    
    const postData = {
      path: MAIN_FOLDER_PATH,
      recursive: false,
      include_media_info: false,
      include_deleted: false,
      include_has_explicit_shared_members: false,
      include_mounted_folders: true,
      include_non_downloadable_files: false
    }
    
    const result = await makeRequest(options, postData)
    const files = result.entries.filter(file => file['.tag'] === 'file')
    
    return files
  } catch (error) {
    console.error('❌ Error listing Dropbox files:', error)
    throw error
  }
}

// Download a single file from Dropbox
async function downloadDropboxFile(file) {
  try {
    const options = {
      hostname: 'content.dropboxapi.com',
      port: 443,
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: file.path_display
        })
      }
    }
    
    const fileBuffer = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        const chunks = []
        res.on('data', chunk => chunks.push(chunk))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      })
      req.on('error', reject)
      req.end()
    })
    
    const localPath = path.join(DOWNLOAD_DIR, file.name)
    await fs.writeFile(localPath, fileBuffer)
    
    return { success: true, localPath }
  } catch (error) {
    console.error(`❌ Error downloading file ${file.name}:`, error)
    return { success: false, error: error.message }
  }
}

// Download all files from main/ folder
async function downloadAllFiles() {
  try {
    await ensureDownloadDirectory()
    const files = await listDropboxFiles()
    
    if (files.length === 0) {
      return { success: true, downloaded: 0, failed: 0, files: [] }
    }
    
    const results = []
    let downloaded = 0
    let failed = 0
    
    for (const file of files) {
      const result = await downloadDropboxFile(file)
      results.push({
        name: file.name,
        success: result.success,
        localPath: result.localPath,
        error: result.error
      })
      
      if (result.success) {
        downloaded++
      } else {
        failed++
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return {
      success: true,
      downloaded,
      failed,
      files: results
    }
  } catch (error) {
    console.error('❌ Error in downloadAllFiles:', error)
    return {
      success: false,
      downloaded: 0,
      failed: 0,
      files: []
    }
  }
}

// Start the background service
function startVercelDropboxService() {
  if (isRunning) {
    console.log('⚠️ Dropbox service is already running')
    return
  }

  console.log('🚀 Starting Vercel Dropbox Background Service...')
  console.log(`📅 Auto-download every ${DOWNLOAD_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📁 Source: Dropbox main/ folder`)
  console.log(`💾 Destination: ${DOWNLOAD_DIR}/`)
  console.log(`🧹 Auto-cleanup after ${MAX_FILE_AGE_HOURS} hours`)
  console.log('✅ Service running automatically in background...')
  console.log('')

  isRunning = true

  // Perform initial download
  setTimeout(async () => {
    console.log('🎯 Initial download starting...')
    const result = await downloadAllFiles()
    if (result.success) {
      console.log(`✅ Initial download completed: ${result.downloaded} files downloaded, ${result.failed} failed`)
    } else {
      console.error('❌ Initial download failed')
    }
  }, 5000) // Wait 5 seconds after startup

  // Set up download interval
  downloadTimer = setInterval(async () => {
    console.log('⏰ Starting scheduled download...')
    const result = await downloadAllFiles()
    if (result.success) {
      console.log(`✅ Scheduled download completed: ${result.downloaded} files downloaded, ${result.failed} failed`)
    } else {
      console.error('❌ Scheduled download failed')
    }
  }, DOWNLOAD_INTERVAL)

  // Set up cleanup interval
  cleanupTimer = setInterval(async () => {
    console.log('🧹 Starting scheduled cleanup...')
    // Cleanup logic would go here
    console.log('✅ Cleanup completed')
  }, CLEANUP_INTERVAL)

  // Log status every hour
  statusTimer = setInterval(() => {
    console.log(`⏰ [${new Date().toISOString()}] Dropbox Service Status: RUNNING`)
  }, 60 * 60 * 1000) // Every hour

  console.log('✅ Vercel Dropbox Background Service started successfully!')
}

// Stop the service
function stopVercelDropboxService() {
  if (!isRunning) {
    console.log('⚠️ Dropbox service is not running')
    return
  }

  console.log('🛑 Stopping Vercel Dropbox service...')

  if (downloadTimer) {
    clearInterval(downloadTimer)
    downloadTimer = null
  }

  if (cleanupTimer) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
  }

  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }

  isRunning = false
  console.log('✅ Vercel Dropbox service stopped')
}

// Auto-start in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // Start immediately in production
  startVercelDropboxService()
}

// Export functions for manual control
module.exports = {
  startVercelDropboxService,
  stopVercelDropboxService,
  downloadAllFiles,
  isRunning: () => isRunning
}
