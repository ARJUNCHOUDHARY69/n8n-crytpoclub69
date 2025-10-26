#!/usr/bin/env node

/**
 * Dropbox Background Service
 * Runs independently as a background service
 * Downloads files every 25 hours from Dropbox main/ folder
 */

const { startScheduler, getSchedulerStatus } = require('../lib/scheduler.ts')

console.log('🚀 Starting Dropbox Background Service...')
console.log('📅 Service will run every 25 hours')
console.log('📁 Downloading from Dropbox main/ folder')
console.log('💾 Saving to ./public/dropbox-downloads/')
console.log('🧹 Auto-cleanup after 25 hours')
console.log('')

// Start the scheduler
startScheduler()

// Log status every hour
setInterval(() => {
  const status = getSchedulerStatus()
  console.log(`⏰ [${new Date().toISOString()}] Service Status: ${status.isRunning ? 'RUNNING' : 'STOPPED'}`)
}, 60 * 60 * 1000) // Every hour

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Dropbox service...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Dropbox service...')
  process.exit(0)
})

console.log('✅ Dropbox Background Service is running!')
console.log('Press Ctrl+C to stop the service')
