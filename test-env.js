// Test environment variable loading
require('dotenv').config({ path: '.env.local' })

console.log('Environment variables test:')
console.log('DROPBOX_ACCESS_TOKEN exists:', !!process.env.DROPBOX_ACCESS_TOKEN)
console.log('DROPBOX_ACCESS_TOKEN length:', process.env.DROPBOX_ACCESS_TOKEN ? process.env.DROPBOX_ACCESS_TOKEN.length : 0)
console.log('DROPBOX_ACCESS_TOKEN starts with sl.u.:', process.env.DROPBOX_ACCESS_TOKEN ? process.env.DROPBOX_ACCESS_TOKEN.startsWith('sl.u.') : false)

if (!process.env.DROPBOX_ACCESS_TOKEN) {
  console.log('❌ DROPBOX_ACCESS_TOKEN is not set!')
  console.log('Please create a .env.local file with:')
  console.log('DROPBOX_ACCESS_TOKEN=your_token_here')
} else {
  console.log('✅ DROPBOX_ACCESS_TOKEN is properly set')
}
