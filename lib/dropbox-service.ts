import { NextRequest, NextResponse } from 'next/server'

// Dropbox API configuration
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN || 'sl.u.AGHwc6i8fwaqbJyO3EEryBgFgxPNf5E-yhfypTTyGVUxu3iklJq64Z8ilqBZjcKsXzx1skAlpAZluCoxE6EF-IV0JCqZlaRhpMEUEqykFK2OJc9J70GRfi6VdAh_aQLrhQWp7H7vdHm2kvYspVJ70JGBq3qTcs0szYqBvPbvlWc2Knr8ylUQyAwSHsz-_K_U95VtOKfq_SDymoiSIf3R_8-hnxqWJAh6tlUJJM9lLXP-8RIV3A20YI3PMaCvBDcZ3tvgLoctCJzg4Q7aD-oFv3e4srmyzYJOIyLnXU6USRVrQxDpXc1c91bWY99LYzG9uCrE4NIIKh6tOD3HVNWbIOvOqi1Cp4qyCZzS9ZXAbyxJSY9tGjqJpadINx5OQk1q85Yrt9vJfeK3GcIw5nbJouSUcqIAXPXtfdlAQXrMTB2FLNi-xdpokiKh8GsUJFmTBUpsbcoMgo43uj29di80Uc7YBqoOzw64-pcM_smHcqNu6V1YMu2sgzn1-ekewetzxaJmRKfE_YEkivgOCrZlgycSEqXoFS_vt2kxbJsADyx-zNObGu4yCbYrWDHoav4I7tvgFP2eCMPvCwOjVPJ50-14d0MZJxOvaIv8xiIBvGqv6hC-Cx-IR3xnRJHFyCcz-q4EgLwurrae3JqpwUd2hr51J7bQ_rXslUqsLflWJ2diNH2MSbENu80VUU6MH-s910Bx7JZXGDx-6piarFH0QrfPBZ-NuGYf03u3_vVf1iGPR_-26OiGTEBrFYsEx9mL-S2YT2GquJ3kvPXQVF-qxbbVuq2pbxroWVlQCYT-ANghuAeHO0lZSBCzX65s61ZRcpzjBYTZFv4P_24Ts-1HDtDOVL0aeZaji0SelKOnfzNjNGec_nMIR-xoeXDKCV_VXlF78SeSKRMGjyFVE3oWD5h2zSGwrMrSHgWlygKQ9InyPhOusR6J5J4mEZ6mL9KzC8tTDjIbI7_Jqky5bdyhgau7_KLqsvcM-rQQzwjGyl1FYEFrlubZmdm6Ph94LQM64wG6T7zeNWw8YXGXazKU-0l8eE-BYFrHgy6GNI2vrJl_igmZ-J8WiUmFhIbAX-BPngU-5uKWCqqaTThlKsreqC0oRaWCxcU-g90-qLIVOMHJPspuDG5NtnwM-P5IkpjE3mbfJzARiplMisw7JNkT6Qbu3C16QBLo6zZ6Wuzm7cm2U9nb3OKrzXbLjlCTa6q6Rxz9ifknNgPr-miJImgW5IDsQ_o4wz5Q6w0GQzBO8KRD0BRjoDp4Tn_xAn_d2QODRlQBkfc1A4IvYcJD0HEDjkm2Rdf3Zzv-p7MqFVT4C0CSNNXlbiuCGFyLGhqDKjrn_KmnbEheagaaASpIE0_YQrCIiEqm9BWPgYsCeq-SInm3vECl_3JEnk2wK9U3FLr4SEQ5Yzodz485M6aOEjAbiQhQZAAYaKhJb_NcrFiSogsS0Q'
const DROPBOX_API_BASE = 'https://api.dropboxapi.com/2'
const DROPBOX_CONTENT_BASE = 'https://content.dropboxapi.com/2'

// File storage configuration
const DOWNLOAD_DIR = './public/dropbox-downloads'
const MAIN_FOLDER_PATH = '/main'

// Interface for Dropbox file metadata
interface DropboxFile {
  name: string
  path_lower: string
  path_display: string
  id: string
  client_modified: string
  server_modified: string
  rev: string
  size: number
  content_hash: string
  '.tag': string
}

interface DropboxListResponse {
  entries: DropboxFile[]
  cursor: string
  has_more: boolean
}

interface DropboxDownloadResponse {
  name: string
  path_lower: string
  path_display: string
  id: string
  client_modified: string
  server_modified: string
  rev: string
  size: number
  content_hash: string
  '.tag': string
}

// Cache for downloaded files metadata
const downloadedFilesCache = new Map<string, { 
  file: DropboxFile, 
  localPath: string, 
  downloadedAt: Date 
}>()

// Utility function to create download directory
async function ensureDownloadDirectory() {
  const fs = await import('fs/promises')
  const path = await import('path')
  
  try {
    await fs.access(DOWNLOAD_DIR)
  } catch {
    await fs.mkdir(DOWNLOAD_DIR, { recursive: true })
    console.log('📁 Created download directory:', DOWNLOAD_DIR)
  }
}

// Function to list files in Dropbox main/ folder
export async function listDropboxFiles(): Promise<DropboxFile[]> {
  try {
    console.log('🔍 Listing files from Dropbox main/ folder...')
    
    const response = await fetch(`${DROPBOX_API_BASE}/files/list_folder`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: MAIN_FOLDER_PATH,
        recursive: false,
        include_media_info: false,
        include_deleted: false,
        include_has_explicit_shared_members: false,
        include_mounted_folders: true,
        include_non_downloadable_files: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Dropbox API error: ${response.status} - ${errorText}`)
    }

    const data: DropboxListResponse = await response.json()
    console.log(`📋 Found ${data.entries.length} files in main/ folder`)
    
    return data.entries.filter(file => file['.tag'] === 'file')
  } catch (error) {
    console.error('❌ Error listing Dropbox files:', error)
    throw error
  }
}

// Function to download a single file from Dropbox
export async function downloadDropboxFile(file: DropboxFile): Promise<{ success: boolean; localPath?: string; error?: string }> {
  try {
    console.log(`⬇️ Downloading file: ${file.name}`)
    
    // Ensure download directory exists
    await ensureDownloadDirectory()
    
    const response = await fetch(`${DROPBOX_CONTENT_BASE}/files/download`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: file.path_display
        })
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Download failed: ${response.status} - ${errorText}`)
    }

    // Get file content
    const fileBuffer = await response.arrayBuffer()
    const fileContent = Buffer.from(fileBuffer)
    
    // Create local file path
    const path = await import('path')
    const localPath = path.join(DOWNLOAD_DIR, file.name)
    
    // Write file to local storage
    const fs = await import('fs/promises')
    await fs.writeFile(localPath, fileContent)
    
    // Update cache
    downloadedFilesCache.set(file.id, {
      file,
      localPath,
      downloadedAt: new Date()
    })
    
    console.log(`✅ Successfully downloaded: ${file.name} (${file.size} bytes)`)
    
    return { success: true, localPath }
  } catch (error) {
    console.error(`❌ Error downloading file ${file.name}:`, error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Function to download all files from main/ folder
export async function downloadAllFilesFromMain(): Promise<{
  success: boolean
  downloaded: number
  failed: number
  files: Array<{ name: string; success: boolean; localPath?: string; error?: string }>
}> {
  try {
    console.log('🚀 Starting automatic download from Dropbox main/ folder...')
    
    // List all files in main/ folder
    const files = await listDropboxFiles()
    
    if (files.length === 0) {
      console.log('📭 No files found in main/ folder')
      return {
        success: true,
        downloaded: 0,
        failed: 0,
        files: []
      }
    }
    
    console.log(`📦 Found ${files.length} files to download`)
    
    // Download each file
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
    console.error('❌ Error in downloadAllFilesFromMain:', error)
    return {
      success: false,
      downloaded: 0,
      failed: 0,
      files: []
    }
  }
}

// Function to get download status
export function getDownloadStatus() {
  return {
    totalFiles: downloadedFilesCache.size,
    files: Array.from(downloadedFilesCache.values()).map(cache => ({
      name: cache.file.name,
      size: cache.file.size,
      localPath: cache.localPath,
      downloadedAt: cache.downloadedAt,
      serverModified: cache.file.server_modified
    }))
  }
}

// Function to clean up old files (optional)
export async function cleanupOldFiles(maxAgeHours: number = 24) {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const now = new Date()
    const maxAge = maxAgeHours * 60 * 60 * 1000 // Convert to milliseconds
    
    let cleaned = 0
    
    const entries = Array.from(downloadedFilesCache.entries())
    for (const [fileId, cache] of entries) {
      const age = now.getTime() - cache.downloadedAt.getTime()
      
      if (age > maxAge) {
        try {
          await fs.unlink(cache.localPath)
          downloadedFilesCache.delete(fileId)
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
