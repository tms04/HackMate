# Setting Up Google OAuth with Clerk

This guide will help you properly configure Google OAuth with Clerk for your HackMate application.

## Step 1: Create a Google OAuth Client

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if not already done
6. For Application type, select "Web application"
7. Enter a name for your OAuth client
8. Add the following Authorized JavaScript origins:
   - `http://localhost:5173` (for local development with Vite)
   - `http://localhost:3000` (if you're using a different port)
   - Your production domain if deployed
9. Add the following Authorized redirect URIs:
   - `http://localhost:5173/oauth-callback-handler`
   - `http://localhost:3000/oauth-callback-handler`
   - `https://[your_clerk_frontend_api]/v1/client/callback` (replace with your actual Clerk frontend API URL)
   - Your production callback URL if deployed
10. Click "Create" and note your Client ID and Client Secret

## Step 2: Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.dev/)
2. Select your application or create a new one
3. Go to "Integrations" in the sidebar
4. Find Google in the list and click "Enable"
5. Enter the Client ID and Client Secret from Google Cloud Console
6. Under "Redirect URLs", add:
   - `http://localhost:5173/oauth-callback-handler`
   - Your production callback URL if deployed
7. Save your changes

## Step 3: Update Your Environment Variables

Make sure your `.env` file contains the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_CLERK_SIGN_IN_URL=/login
VITE_CLERK_SIGN_UP_URL=/signup
VITE_CLERK_AFTER_SIGN_IN_URL=/main
VITE_CLERK_AFTER_SIGN_UP_URL=/userdetails
```

## Step 4: Clear Browser Caches & Data

If you're still having issues:

1. Clear your browser cookies and cache
2. Try in an incognito/private browsing window
3. Check Chrome DevTools console for any CORS or network errors

## Troubleshooting

### Authentication Failed Errors

1. Verify that your Google Cloud project has "OAuth consent screen" properly configured
2. Ensure that the Google Cloud project has OAuth 2.0 API enabled
3. Check that your redirect URLs exactly match between Google Cloud and Clerk
4. Verify that your Clerk publishable key is correct
5. Use the debug panel in the login page to check for API connection errors

### Network Errors

1. Make sure you're not blocking third-party cookies in your browser
2. Check if there are any CORS errors in the console
3. Verify that your network allows connections to Clerk's servers

### JSON Parse Errors

If you see JSON parsing errors, it could indicate that the OAuth response is not being properly handled. Double-check:

1. Your redirect URL implementation
2. Clerk configuration
3. That all required parameters are being passed

## Debug Mode

Enable the debug mode in the login page to get more detailed information about what's happening during the authentication process.

For further assistance, please consult [Clerk's Documentation](https://clerk.com/docs) or file an issue on the project repository. 