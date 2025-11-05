# Setting Up Google OAuth for Health World

## Prerequisites

- Google account
- Health World application running locally

## Step-by-Step Guide

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: `Health World` (or your preferred name)
5. Click "Create"

### 2. Enable Google+ API

1. In the left sidebar, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and press "Enable"
4. Also enable "Google Identity Services" (OAuth 2.0)

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** (or Internal if you have a Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: Health World
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click "Save and Continue"
6. On the Scopes screen, click "Save and Continue" (default scopes are fine)
7. On Test users screen, add your email as a test user
8. Click "Save and Continue"

### 4. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click "+ Create Credentials" at the top
3. Select "OAuth client ID"
4. Choose application type: **Web application**
5. Enter name: `Health World Web Client`
6. Under "Authorized JavaScript origins", add:

   ```
   http://localhost:3000
   ```

7. Under "Authorized redirect URIs", add:

   ```
   http://localhost:3000/api/auth/callback/google
   ```

8. Click "Create"

### 5. Copy Your Credentials

1. A popup will show your **Client ID** and **Client Secret**
2. Copy these values
3. Open your `.env.local` file in the project root
4. Replace the placeholder values:

   ```bash
   GOOGLE_CLIENT_ID=your-actual-client-id-here
   GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
   ```

### 6. Update NEXTAUTH_SECRET

Generate a secure secret key:

**Option 1 - Using OpenSSL (recommended):**

```bash
openssl rand -base64 32
```

**Option 2 - Using Node.js:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated value and update `.env.local`:

```bash
NEXTAUTH_SECRET=your-generated-secret-here
```

### 7. Restart Your Development Server

```bash
npm run dev
```

### 8. Test Google Sign-In

1. Navigate to <http://localhost:3000/auth/signup> or <http://localhost:3000/auth/signin>
2. Click "Continue with Google"
3. You should be redirected to Google's login page
4. Sign in with your Google account
5. Grant permissions to Health World
6. You should be redirected back to the app

## For Production Deployment

When deploying to production (e.g., Vercel, Netlify):

1. Update OAuth consent screen to "Published" status
2. Add your production domain to Authorized JavaScript origins:

   ```
   https://yourdomain.com
   ```

3. Add production callback URL to Authorized redirect URIs:

   ```
   https://yourdomain.com/api/auth/callback/google
   ```

4. Update environment variables on your hosting platform:

   ```bash
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Troubleshooting

### "Error 400: redirect_uri_mismatch"

- Make sure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check for trailing slashes or typos
- Ensure the port number matches your dev server

### "Error 403: access_denied"

- Add your email as a test user in OAuth consent screen
- Make sure the app is not suspended
- Check that Google+ API is enabled

### "Error: NEXTAUTH_SECRET missing"

- Generate a secret using the methods above
- Add it to your `.env.local` file
- Restart your dev server

### Google button does nothing

- Check browser console for errors
- Ensure NextAuth is properly configured
- Verify environment variables are loaded (restart dev server)

## Security Notes

- ⚠️ **Never commit** your `.env.local` file to Git
- ✅ The `.gitignore` already excludes `.env*.local` files
- ✅ Use different credentials for development and production
- ✅ Rotate your `NEXTAUTH_SECRET` periodically
- ✅ Keep your `GOOGLE_CLIENT_SECRET` confidential

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)
