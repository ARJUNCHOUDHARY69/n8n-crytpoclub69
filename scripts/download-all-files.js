#!/usr/bin/env node

/**
 * Download All Files Script
 * Downloads all files from Dropbox main/ folder during build
 */

const https = require('https')
const fs = require('fs').promises
const path = require('path')

// Configuration
const DROPBOX_ACCESS_TOKEN = 'sl.u.AGHwc6i8fwaqbJyO3EEryBgFgxPNf5E-yhfypTTyGVUxu3iklJq64Z8ilqBZjcKsXzx1skAlpAZluCoxE6EF-IV0JCqZlaRhpMEUEqykFK2OJc9J70GRfi6VdAh_aQLrhQWp7H7vdHm2kvYspVJ70JGBq3qTcs0szYqBvPbvlWc2Knr8ylUQyAwSHsz-_K_U95VtOKfq_SDymoiSIf3R_8-hnxqWJAh6tlUJJM9lLXP-8RIV3A20YI3PMaCvBDcZ3tvgLoctCJzg4Q7aD-oFv3e4srmyzYJOIyLnXU6USRVrQxDpXc1c91bWY99LYzG9uCrE4NIIKh6tOD3HVNWbIOvOqi1Cp4qyCZzS9ZXAbyxJSY9tGjqJpadINx5OQk1q85Yrt9vJfeK3GcIw5nbJouSUcqIAXPXtfdlAQXrMTB2FLNi-xdpokiKh8GsUJFmTBUpsbcoMgo43uj29di80Uc7YBqoOzw64-pcM_smHcqNu6V1YMu2sgzn1-ekewetzxaJmRKfE_YEkivgOCrZlgycSEqXoFS_vt2kxbJsADyx-zNObGu4yCbYrWDHoav4I7tvgFP2eCMPvCwOjVPJ50-14d0MZJxOvaIv8xiIBvGqv6hC-Cx-IR3xnRJHFyCcz-q4EgLwurrae3JqpwUd2hr51J7bQ_rXslUqsLflWJ2diNH2MSbENu80VUU6MH-s910Bx7JZXGDx-6piarFH0QrfPBZ-NuGYf03u3_vVf1iGPR_-26OiGTEBrFYsEx9mL-S2YT2GquJ3kvPXQVF-qxbbVuq2pbxroWVlQCYT-ANghuAeHO0lZSBCzX65s61ZRcpzjBYTZFv4P_24Ts-1HDtDOVL0aeZaji0SelKOnfzNjNGec_nMIR-xoeXDKCV_VXlF78SeSKRMGjyFVE3oWD5h2zSGwrMrSHgWlygKQ9InyPhOusR6J5J4mEZ6mL9KzC8tTDjIbI7_Jqky5bdyhgau7_KLqsvcM-rQQzwjGyl1FYEFrlubZmdm6Ph94LQM64wG6T7zeNWw8YXGXazKU-0l8eE-BYFrHgy6GNI2vrJl_igmZ-J8WiUmFhIbAX-BPngU-5uKWCqqaTThlKsreqC0oRaWCxcU-g90-qLIVOMHJPspuDG5NtnwM-P5IkpjE3mbfJzARiplMisw7JNkT6Qbu3C16QBLo6zZ6Wuzm7cm2U9nb3OKrzXbLjlCTa6q6Rxz9ifknNgPr-miJImgW5IDsQ_o4wz5Q6w0GQzBO8KRD0BRjoDp4Tn_xAn_d2QODRlQBkfc1A4IvYcJD0HEDjkm2Rdf3Zzv-p7MqFVT4C0CSNNXlbiuCGFyLGhqDKjrn_KmnbEheagaaASpIE0_YQrCIiEqm9BWPgYsCeq-SInm3vECl_3JEnk2wK9U3FLr4SEQ5Yzodz485M6aOEjAbiQhQZAAYaKhJb_NcrFiSogsS0Q'
const DOWNLOAD_DIR = './public/dropbox-downloads'
const MAIN_FOLDER_PATH = '/main'

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
    console.log('📁 Download directory exists:', DOWNLOAD_DIR)
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
    
    return { success: true, localPath, size: fileBuffer.length }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Download all files from main/ folder
async function downloadAllFiles() {
  try {
    console.log('🚀 Starting Dropbox download during build...')
    
    await ensureDownloadDirectory()
    const files = await listDropboxFiles()
    
    if (files.length === 0) {
      console.log('📭 No files found in main/ folder')
      return { success: true, downloaded: 0, failed: 0, files: [] }
    }
    
    console.log(`📦 Downloading all ${files.length} files...`)
    
    const results = []
    let downloaded = 0
    let failed = 0
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`⬇️ [${i + 1}/${files.length}] Downloading: ${file.name} (${file.size} bytes)`)
      
      const result = await downloadDropboxFile(file)
      results.push({
        name: file.name,
        success: result.success,
        localPath: result.localPath,
        size: result.size,
        error: result.error
      })
      
      if (result.success) {
        downloaded++
        console.log(`✅ [${i + 1}/${files.length}] Downloaded: ${file.name} (${result.size} bytes)`)
      } else {
        failed++
        console.log(`❌ [${i + 1}/${files.length}] Failed: ${file.name} - ${result.error}`)
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    console.log(`🎉 Download complete: ${downloaded} successful, ${failed} failed`)
    
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

// Main function
async function main() {
  console.log('🚀 Dropbox Build Download Script')
  console.log('📅 Downloading all files during build process')
  console.log('📁 Source: Dropbox main/ folder')
  console.log('💾 Destination: ./public/dropbox-downloads/')
  console.log('')
  
  try {
    const result = await downloadAllFiles()
    
    console.log('\n📊 Final Results:')
    console.log(`✅ Success: ${result.success}`)
    console.log(`📥 Downloaded: ${result.downloaded}`)
    console.log(`❌ Failed: ${result.failed}`)
    
    if (result.downloaded > 0) {
      console.log(`\n🎉 Successfully downloaded ${result.downloaded} files during build!`)
    }
    
    console.log('\n✅ Build download script completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Build download script failed:', error)
    process.exit(1)
  }
}

// Run the script
main()
