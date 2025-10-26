import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

interface DropboxFile {
  id: string
  name: string
  path: string
  size: number
  content: Buffer
  modified: string
  cached_at: number
}

interface DropboxCache {
  files: DropboxFile[]
  last_updated: number
  cache_duration: number // 24 hours in milliseconds
}

const CACHE_DIR = path.join(process.cwd(), 'cache', 'dropbox')
const CACHE_FILE = path.join(CACHE_DIR, 'dropbox-cache.json')
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Ensure cache directory exists
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }
}

// Load cache from file
function loadCache(): DropboxCache {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cacheData = fs.readFileSync(CACHE_FILE, 'utf-8')
      return JSON.parse(cacheData)
    }
  } catch (error) {
    console.error('Error loading cache:', error)
  }
  
  return {
    files: [],
    last_updated: 0,
    cache_duration: CACHE_DURATION
  }
}

// Save cache to file
function saveCache(cache: DropboxCache) {
  try {
    ensureCacheDir()
    
    // Save files to individual files in cache folder
    const filesFolder = path.join(CACHE_DIR, 'files')
    if (!fs.existsSync(filesFolder)) {
      fs.mkdirSync(filesFolder, { recursive: true })
    }
    
    // Save each file to its own file
    cache.files.forEach(file => {
      try {
        const filePath = path.join(filesFolder, file.name)
        fs.writeFileSync(filePath, file.content)
        console.log(`✅ DROPBOX DEBUG: Saved file: ${file.name}`)
      } catch (error) {
        console.error(`❌ DROPBOX DEBUG: Failed to save file ${file.name}:`, error)
      }
    })
    
    // Create a lightweight cache metadata without file content
    const lightweightCache = {
      files: cache.files.map(file => ({
        id: file.id,
        name: file.name,
        path: file.path,
        size: file.size,
        modified: file.modified,
        cached_at: file.cached_at,
        local_path: `files/${file.name}` // Reference to local file
      })),
      last_updated: cache.last_updated,
      cache_duration: cache.cache_duration
    }
    
    fs.writeFileSync(CACHE_FILE, JSON.stringify(lightweightCache, null, 2))
    console.log('✅ DROPBOX DEBUG: Cache saved successfully with files in folder')
  } catch (error) {
    console.error('❌ DROPBOX DEBUG: Error saving cache:', error)
  }
}

// Check if cache is valid (not expired)
function isCacheValid(cache: DropboxCache): boolean {
  const now = Date.now()
  return (now - cache.last_updated) < cache.cache_duration
}

// Download file from Dropbox
async function downloadFromDropbox(filePath: string, accessToken: string): Promise<Buffer> {
  console.log('🔍 DROPBOX DEBUG: Downloading file:', filePath)
  
  const response = await fetch(`https://content.dropboxapi.com/2/files/download`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Dropbox-API-Arg': JSON.stringify({ path: filePath })
    }
  })

  console.log('🔍 DROPBOX DEBUG: Download response status:', response.status)
  console.log('🔍 DROPBOX DEBUG: Download response headers:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ DROPBOX DEBUG: Download error response:', errorText)
    throw new Error(`Dropbox download failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  console.log('🔍 DROPBOX DEBUG: Downloaded file size:', arrayBuffer.byteLength, 'bytes')
  return Buffer.from(arrayBuffer)
}

// List files in Dropbox folder
async function listDropboxFiles(folderPath: string, accessToken: string): Promise<any[]> {
  console.log('🔍 DROPBOX DEBUG: Listing folder:', folderPath)
  
  const response = await fetch(`https://api.dropboxapi.com/2/files/list_folder`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: folderPath,
      recursive: false
    })
  })

  console.log('🔍 DROPBOX DEBUG: API response status:', response.status)
  console.log('🔍 DROPBOX DEBUG: API response headers:', Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ DROPBOX DEBUG: API error response:', errorText)
    throw new Error(`Dropbox list failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const data = await response.json()
  console.log('🔍 DROPBOX DEBUG: API response data:', JSON.stringify(data, null, 2))
  return data.entries || []
}

// Clear old cache files that are no longer in Dropbox
function clearOldCacheFiles(currentFileNames: string[]) {
  try {
    const filesFolder = path.join(CACHE_DIR, 'files')
    if (fs.existsSync(filesFolder)) {
      const existingFiles = fs.readdirSync(filesFolder)
      const filesToDelete = existingFiles.filter(file => !currentFileNames.includes(file))
      
      filesToDelete.forEach(file => {
        const filePath = path.join(filesFolder, file)
        fs.unlinkSync(filePath)
        console.log(`🗑️ DROPBOX DEBUG: Deleted old cache file: ${file}`)
      })
    }
  } catch (error) {
    console.error('❌ DROPBOX DEBUG: Error clearing old cache files:', error)
  }
}

// Download all files from Dropbox main folder
export async function downloadDropboxFiles(): Promise<DropboxFile[]> {
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN
  
  console.log('🔍 DROPBOX DEBUG: Starting download process...')
  console.log('🔍 DROPBOX DEBUG: Access token exists:', !!accessToken)
  console.log('🔍 DROPBOX DEBUG: Access token length:', accessToken?.length || 0)
  
  if (!accessToken) {
    console.error('❌ DROPBOX_ACCESS_TOKEN not found, skipping Dropbox download')
    return []
  }

  try {
    console.log('🔍 DROPBOX DEBUG: Listing files in /main folder...')
    const files = await listDropboxFiles('/main', accessToken)
    console.log('🔍 DROPBOX DEBUG: Found files:', files.length)
    console.log('🔍 DROPBOX DEBUG: Files details:', JSON.stringify(files, null, 2))
    
    const downloadedFiles: DropboxFile[] = []
    const currentFileNames: string[] = []

    for (const file of files) {
      console.log('🔍 DROPBOX DEBUG: Processing file:', file.name, 'Type:', file['.tag'])
      
      if (file['.tag'] === 'file') {
        currentFileNames.push(file.name)
        try {
          console.log('🔍 DROPBOX DEBUG: Downloading file:', file.name)
          const content = await downloadFromDropbox(file.path_display, accessToken)
          console.log('🔍 DROPBOX DEBUG: Downloaded file size:', content.length, 'bytes')
          
          const dropboxFile: DropboxFile = {
            id: file.id,
            name: file.name,
            path: file.path_display,
            size: file.size,
            content: content,
            modified: file.server_modified,
            cached_at: Date.now()
          }
          
          downloadedFiles.push(dropboxFile)
          console.log('✅ DROPBOX DEBUG: Successfully processed file:', file.name)
        } catch (error) {
          console.error('❌ DROPBOX DEBUG: Failed to download file:', file.name, 'Error:', error)
        }
      } else {
        console.log('🔍 DROPBOX DEBUG: Skipping non-file item:', file.name, 'Type:', file['.tag'])
      }
    }

    console.log('🔍 DROPBOX DEBUG: Total files processed:', downloadedFiles.length)
    
    // Clear old cache files that are no longer in Dropbox
    clearOldCacheFiles(currentFileNames)
    
    // Save to cache
    const cache: DropboxCache = {
      files: downloadedFiles,
      last_updated: Date.now(),
      cache_duration: CACHE_DURATION
    }
    
    saveCache(cache)
    console.log('✅ DROPBOX DEBUG: Cache saved successfully')
    
    return downloadedFiles
  } catch (error) {
    console.error('❌ DROPBOX DEBUG: Download failed with error:', error)
    console.error('❌ DROPBOX DEBUG: Error details:', JSON.stringify(error, null, 2))
    return []
  }
}

// Get cached files (download if cache is expired)
export async function getCachedFiles(): Promise<DropboxFile[]> {
  const cache = loadCache()
  
  if (isCacheValid(cache)) {
    return cache.files
  }
  
  return await downloadDropboxFiles()
}

// Get specific file by name
export async function getCachedFile(fileName: string): Promise<DropboxFile | null> {
  const files = await getCachedFiles()
  return files.find(file => file.name === fileName) || null
}

// Clean up expired cache
export function cleanupCache() {
  const cache = loadCache()
  
  if (!isCacheValid(cache)) {
    const emptyCache: DropboxCache = {
      files: [],
      last_updated: 0,
      cache_duration: CACHE_DURATION
    }
    saveCache(emptyCache)
  }
}

// Initialize cache system on startup
export async function initializeDropboxCache() {
  console.log('🔍 DROPBOX DEBUG: initializeDropboxCache called')
  
  // Ensure cache directory exists
  console.log('🔍 DROPBOX DEBUG: Ensuring cache directory exists...')
  ensureCacheDir()
  console.log('🔍 DROPBOX DEBUG: Cache directory ensured')
  
  // Check if cache is valid first
  const cache = loadCache()
  const isValid = isCacheValid(cache)
  
  if (isValid && cache.files.length > 0) {
    console.log('✅ DROPBOX DEBUG: Cache is valid, skipping download. Files:', cache.files.length)
    console.log('⏰ DROPBOX DEBUG: Cache expires in:', Math.round((cache.cache_duration - (Date.now() - cache.last_updated)) / 1000), 'seconds')
    return
  }
  
  console.log('🔄 DROPBOX DEBUG: Cache expired or empty, downloading fresh files...')
  
  // Clean up any expired cache
  console.log('🔍 DROPBOX DEBUG: Cleaning up expired cache...')
  cleanupCache()
  console.log('🔍 DROPBOX DEBUG: Cache cleanup completed')
  
  // Download fresh files
  console.log('🔍 DROPBOX DEBUG: Starting fresh file download...')
  const result = await downloadDropboxFiles()
  console.log('🔍 DROPBOX DEBUG: File download completed, result:', result.length, 'files')
}

// Get cache status
export function getCacheStatus() {
  const cache = loadCache()
  const isValid = isCacheValid(cache)
  const timeLeft = isValid ? Math.max(0, cache.cache_duration - (Date.now() - cache.last_updated)) : 0
  
  // Calculate time remaining in human readable format
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)
  
  const timeRemaining = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
  
  return {
    files_count: cache.files.length,
    last_updated: new Date(cache.last_updated).toISOString(),
    is_valid: isValid,
    expires_in: timeLeft,
    cache_duration: cache.cache_duration,
    time_remaining: timeRemaining
  }
}
