// Simple token test script

async function testToken() {
  console.log('🧪 TOKEN TEST: Testing Dropbox token...');
  
  const token = process.env.DROPBOX_ACCESS_TOKEN;
  
  if (!token) {
    console.log('❌ TOKEN TEST: No token found in environment');
    console.log('💡 Please set DROPBOX_ACCESS_TOKEN in .env.local');
    return;
  }
  
  console.log('🔍 TOKEN TEST: Token exists, testing validation...');
  
  try {
    const response = await fetch('https://api.dropboxapi.com/2/users/get_current_account', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      // No body needed - Dropbox API works without body
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ TOKEN TEST: Token is valid!');
      console.log('📧 Account:', data.email);
      console.log('👤 Name:', data.name.display_name);
      console.log('🆔 Account ID:', data.account_id);
    } else {
      const errorText = await response.text();
      console.log('❌ TOKEN TEST: Token validation failed');
      console.log('📊 Status:', response.status);
      console.log('📝 Error:', errorText);
    }
  } catch (error) {
    console.log('❌ TOKEN TEST: Network error:', error.message);
  }
}

testToken();
