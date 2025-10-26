#!/usr/bin/env node

/**
 * Dropbox Background Service
 * Standalone service that runs every 25 hours
 * Downloads files from Dropbox main/ folder
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
const MAX_FILE_AGE_HOURS = 25 // Keep files for 25 hours

// Cache for downloaded files
const downloadedFiles = new Map()

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
    console.log('🔍 Listing files from Dropbox main/ folder...')
    
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
    
    console.log(`📋 Found ${files.length} files in main/ folder`)
    return files
  } catch (error) {
    console.error('❌ Error listing Dropbox files:', error)
    throw error
  }
}

// Download a single file from Dropbox
async function downloadDropboxFile(file) {
  try {
    console.log(`⬇️ Downloading file: ${file.name}`)
    
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
    
    // Update cache
    downloadedFiles.set(file.id, {
      file,
      localPath,
      downloadedAt: new Date()
    })
    
    console.log(`✅ Successfully downloaded: ${file.name} (${file.size} bytes)`)
    return { success: true, localPath }
  } catch (error) {
    console.error(`❌ Error downloading file ${file.name}:`, error)
    return { success: false, error: error.message }
  }
}

// Download all files from main/ folder
async function downloadAllFiles() {
  try {
    console.log('🚀 Starting automatic download from Dropbox main/ folder...')
    
    await ensureDownloadDirectory()
    const files = await listDropboxFiles()
    
    if (files.length === 0) {
      console.log('📭 No files found in main/ folder')
      return { success: true, downloaded: 0, failed: 0, files: [] }
    }
    
    console.log(`📦 Found ${files.length} files to download`)
    
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
    
    console.log(`✅ Download complete: ${downloaded} successful, ${failed} failed`)
    
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

// Clean up old files
async function cleanupOldFiles() {
  try {
    console.log('🧹 Starting cleanup of old files...')
    
    const now = new Date()
    const maxAge = MAX_FILE_AGE_HOURS * 60 * 60 * 1000 // Convert to milliseconds
    
    let cleaned = 0
    const entries = Array.from(downloadedFiles.entries())
    
    for (const [fileId, cache] of entries) {
      const age = now.getTime() - cache.downloadedAt.getTime()
      
      if (age > maxAge) {
        try {
          await fs.unlink(cache.localPath)
          downloadedFiles.delete(fileId)
          cleaned++
          console.log(`🗑️ Cleaned up old file: ${cache.file.name}`)
        } catch (error) {
          console.error(`❌ Error cleaning up file ${cache.file.name}:`, error)
        }
      }
    }
    
    console.log(`🧹 Cleanup complete: removed ${cleaned} old files`)
    return cleaned
  } catch (error) {
    console.error('❌ Error in cleanup:', error)
    return 0
  }
}

// Main service function
async function runService() {
  console.log('🚀 Dropbox Background Service Started')
  console.log(`📅 Auto-download every ${DOWNLOAD_INTERVAL / 1000 / 60 / 60} hours`)
  console.log(`📁 Source: Dropbox main/ folder`)
  console.log(`💾 Destination: ${DOWNLOAD_DIR}/`)
  console.log(`🧹 Auto-cleanup after ${MAX_FILE_AGE_HOURS} hours`)
  console.log('✅ Service running in background...')
  console.log('')
  
  // Perform initial download silently
  setTimeout(async () => {
    console.log('🎯 Initial download starting...')
    await downloadAllFiles()
    console.log('✅ Initial download completed')
  }, 3000) // Wait 3 seconds after startup
  
  // Set up download interval
  setInterval(async () => {
    console.log('⏰ Starting scheduled download...')
    await downloadAllFiles()
  }, DOWNLOAD_INTERVAL)
  
  // Set up cleanup interval
  setInterval(async () => {
    console.log('🧹 Starting scheduled cleanup...')
    await cleanupOldFiles()
  }, CLEANUP_INTERVAL)
  
  // Log status every hour
  setInterval(() => {
    console.log(`⏰ [${new Date().toISOString()}] Service Status: RUNNING`)
  }, 60 * 60 * 1000) // Every hour
  
  console.log('✅ Dropbox Background Service is running!')
  console.log('Press Ctrl+C to stop the service')
}

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Dropbox service...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Dropbox service...')
  process.exit(0)
})

// Start the service
runService().catch(error => {
  console.error('❌ Failed to start service:', error)
  process.exit(1)
})
