import { NextRequest, NextResponse } from 'next/server'

// Import the Vercel Dropbox service
const dropboxService = require('@/lib/vercel-dropbox-service')

// GET /api/dropbox-auto - Auto-start service
export async function GET(request: NextRequest) {
  try {
    // Auto-start the service if not already running
    if (!dropboxService.isRunning()) {
      dropboxService.startVercelDropboxService()
    }

    return NextResponse.json({
      success: true,
      message: 'Dropbox service auto-started',
      isRunning: dropboxService.isRunning(),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error starting Dropbox service:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST /api/dropbox-auto - Manual trigger
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action = 'download' } = body

    if (action === 'download') {
      const result = await dropboxService.downloadAllFiles()
      return NextResponse.json({
        success: result.success,
        message: `Download completed: ${result.downloaded} files downloaded, ${result.failed} failed`,
        ...result
      })
    }

    if (action === 'start') {
      dropboxService.startVercelDropboxService()
      return NextResponse.json({
        success: true,
        message: 'Dropbox service started',
        isRunning: dropboxService.isRunning()
      })
    }

    if (action === 'stop') {
      dropboxService.stopVercelDropboxService()
      return NextResponse.json({
        success: true,
        message: 'Dropbox service stopped',
        isRunning: dropboxService.isRunning()
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use: download, start, or stop'
    }, { status: 400 })

  } catch (error) {
    console.error('❌ Dropbox API Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
