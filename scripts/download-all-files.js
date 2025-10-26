#!/usr/bin/env node

/**
 * Download All Files Script
 * Downloads all files from Dropbox main/ folder during build
 */

const https = require('https')
const fs = require('fs').promises
const path = require('path')

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

// Configuration
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN
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
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`))
            return
          }
          const result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          reject(new Error(`Failed to parse response: ${data}`))
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
    
    if (!result || !result.entries) {
      throw new Error('Invalid response from Dropbox API: ' + JSON.stringify(result))
    }
    
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
  
  // Check if API token is provided
  if (!DROPBOX_ACCESS_TOKEN) {
    console.error('❌ Error: DROPBOX_ACCESS_TOKEN environment variable is not set!')
    console.error('Please set the DROPBOX_ACCESS_TOKEN environment variable.')
    console.error('For Vercel deployment, add it in your project settings.')
    console.log('⚠️ Skipping Dropbox download during build...')
    console.log('✅ Build download script completed!')
    process.exit(0) // Exit successfully to not break the build
  }
  
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
