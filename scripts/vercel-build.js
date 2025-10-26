#!/usr/bin/env node

/**
 * Vercel Build Script
 * Ensures Dropbox service starts automatically after build
 */

console.log('🚀 Vercel Build Script - Starting Dropbox Service Setup...')

// Import the service
const dropboxService = require('../lib/vercel-dropbox-service')

// Start the service
console.log('📦 Starting Dropbox background service...')
dropboxService.startVercelDropboxService()

console.log('✅ Vercel build completed with Dropbox service running!')
console.log('📅 Service will run every 25 hours automatically')
console.log('📁 Downloading from Dropbox main/ folder')
console.log('💾 Saving to ./public/dropbox-downloads/')

// Exit the script after starting the service
process.exit(0)
