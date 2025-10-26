const fetch = require('node-fetch');

async function testCronService() {
  console.log('🧪 CRON SERVICE TEST: Starting cron service test...');
  console.log('🧪 CRON SERVICE TEST: Time:', new Date().toISOString());
  
  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test 1: Manual cron trigger
    console.log('\n🕐 TEST 1: Testing manual cron trigger...');
    const cronResponse = await fetch(`${baseUrl}/api/cron`, {
      method: 'GET'
    });
    const cronData = await cronResponse.json();
    console.log('✅ Cron Response:', JSON.stringify(cronData, null, 2));
    
    // Test 2: POST cron with secret
    console.log('\n🔐 TEST 2: Testing POST cron with secret...');
    const postCronResponse = await fetch(`${baseUrl}/api/cron`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        secret: 'crypto-club-69-cron',
        force: true
      })
    });
    const postCronData = await postCronResponse.json();
    console.log('✅ POST Cron Response:', JSON.stringify(postCronData, null, 2));
    
    // Test 3: Check service status
    console.log('\n📊 TEST 3: Checking service status...');
    const statusResponse = await fetch(`${baseUrl}/api/dropbox-service?action=status`);
    const statusData = await statusResponse.json();
    console.log('✅ Service Status:', JSON.stringify(statusData, null, 2));
    
    console.log('\n🎉 CRON SERVICE TEST: All tests completed successfully!');
    console.log('\n📋 CRON SCHEDULE (24-HOUR CACHE):');
    console.log('   - Cache Duration: 24 hours (86400000 ms)');
    console.log('   - Automatic: Every 12 hours (via cron-service.ts)');
    console.log('   - Vercel Cron: Daily at 00:00 UTC');
    console.log('   - Manual: GET /api/cron or POST /api/cron');
    console.log('   - Smart: Only downloads when cache expires');
    
  } catch (error) {
    console.error('❌ CRON SERVICE TEST: Error during testing:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. Development server is running (npm run dev)');
    console.log('   2. DROPBOX_ACCESS_TOKEN is set in .env.local');
    console.log('   3. Dropbox /main folder exists with files');
  }
}

// Run the test
testCronService();
