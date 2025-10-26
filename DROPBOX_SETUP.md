# 🔐 Dropbox API Setup Instructions

## Environment Variables Required

To use the Dropbox automation service, you need to set up the following environment variable:

### 1. DROPBOX_ACCESS_TOKEN

**Required**: Your Dropbox API access token

#### How to get your Dropbox Access Token:

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click "Create app"
3. Choose "Scoped access"
4. Choose "Full Dropbox" access
5. Give your app a name (e.g., "Crypto Club 69")
6. Click "Create app"
7. Go to the "Permissions" tab
8. Enable "files.metadata.read" and "files.content.read"
9. Go to the "Settings" tab
10. Click "Generate" under "Access token"
11. Copy the generated token

#### Setting the Environment Variable:

**For Local Development:**
Create a `.env.local` file in your project root:
```bash
DROPBOX_ACCESS_TOKEN=your_actual_token_here
```

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add a new variable:
   - Name: `DROPBOX_ACCESS_TOKEN`
   - Value: `your_actual_token_here`
   - Environment: Production, Preview, Development

**For Windows (Command Prompt):**
```cmd
set DROPBOX_ACCESS_TOKEN=your_actual_token_here
```

**For Windows (PowerShell):**
```powershell
$env:DROPBOX_ACCESS_TOKEN="your_actual_token_here"
```

**For Linux/Mac:**
```bash
export DROPBOX_ACCESS_TOKEN=your_actual_token_here
```

## Security Notes

- ✅ **Never commit your actual token to Git**
- ✅ **Use environment variables for all deployments**
- ✅ **Keep your token secure and private**
- ✅ **Regenerate your token if compromised**

## Testing

After setting up the environment variable, test the service:

```bash
npm run build
```

The build process will:
1. Download all files from your Dropbox `main/` folder
2. Build your Next.js application
3. Show detailed logs of the download process

## Troubleshooting

**Error: "DROPBOX_ACCESS_TOKEN environment variable is not set"**
- Make sure you've set the environment variable correctly
- Check that the variable name is exactly `DROPBOX_ACCESS_TOKEN`
- Restart your terminal/IDE after setting the variable

**Error: "Invalid Dropbox access token format"**
- Make sure your token starts with `sl.` or `sl.u.`
- Verify you copied the complete token
- Try generating a new token from Dropbox App Console

**Error: "Authentication failed"**
- Check that your Dropbox app has the correct permissions
- Ensure the token hasn't expired
- Verify the token is for the correct Dropbox account
