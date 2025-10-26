import { NextRequest, NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const imagesDir = join(process.cwd(), 'public', 'images', 'gallery')
    
    // Read all files from the gallery directory
    const files = await readdir(imagesDir)
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    )
    
    // Create image objects with metadata (optimized for large numbers)
    const images = await Promise.all(
      imageFiles.map(async (file, index) => {
        try {
          const filePath = join(imagesDir, file)
          const stats = await stat(filePath)
          return {
            id: index + 1,
            name: file,
            url: `/images/gallery/${file}`,
            size: stats.size,
            uploaded: stats.mtime.toISOString()
          }
        } catch (error) {
          // Fallback if stat fails
          return {
            id: index + 1,
            name: file,
            url: `/images/gallery/${file}`,
            size: 0,
            uploaded: new Date().toISOString()
          }
        }
      })
    )
    
    return NextResponse.json({
      success: true,
      count: images.length,
      images: images,
      message: `Found ${images.length} local images`
    })
    
  } catch (error) {
    console.error('Error reading local images:', error)
    return NextResponse.json({
      success: false,
      count: 0,
      images: [],
      message: 'Error reading local images'
    }, { status: 200 }) // Return 200 to prevent error modals
  }
}

