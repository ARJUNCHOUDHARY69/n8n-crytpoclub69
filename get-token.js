// Quick script to get your current Dropbox token
require('dotenv').config({ path: '.env.local' })

console.log('🔐 Your Dropbox Token:')
console.log('====================')

if (process.env.DROPBOX_ACCESS_TOKEN) {
  const token = process.env.DROPBOX_ACCESS_TOKEN
  console.log('✅ Token found!')
  console.log('📋 Token length:', token.length)
  console.log('🔑 Token starts with:', token.substring(0, 10) + '...')
  console.log('')
  console.log('📋 Copy this token to Vercel:')
  console.log('=============================')
  console.log(token)
  console.log('=============================')
  console.log('')
  console.log('📝 Instructions:')
  console.log('1. Go to https://vercel.com/dashboard')
  console.log('2. Click on your crypto-club-69 project')
  console.log('3. Go to Settings → Environment Variables')
  console.log('4. Add new variable:')
  console.log('   Name: DROPBOX_ACCESS_TOKEN')
  console.log('   Value: [paste the token above]')
  console.log('   Environment: All (Production, Preview, Development)')
  console.log('5. Save and redeploy!')
} else {
  console.log('❌ No DROPBOX_ACCESS_TOKEN found in .env.local')
  console.log('')
  console.log('📝 To fix this:')
  console.log('1. Create a .env.local file in your project root')
  console.log('2. Add: DROPBOX_ACCESS_TOKEN=your_token_here')
  console.log('3. Run this script again')
}
