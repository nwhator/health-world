# Google Maps API Setup Guide

This guide will help you set up Google Maps API for the Health World application. The app uses Google Maps for the Emergency page and Hospital Finder feature.

## Prerequisites

- A Google Cloud account (free tier available)
- A credit card for verification (required for Google Cloud, but free tier is generous)

## Step-by-Step Setup

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a Project** → **New Project**
3. Enter project name: `health-world` (or any name you prefer)
4. Click **Create**
5. Wait for the project to be created and select it

### Step 2: Enable Google Maps JavaScript API

1. In the Google Cloud Console, open the **Navigation Menu** (☰)
2. Go to **APIs & Services** → **Library**
3. Search for "Maps JavaScript API"
4. Click on **Maps JavaScript API**
5. Click **Enable**
6. Also enable these additional APIs (**required for hospital finder**):
   - **Places API** - For finding nearby hospitals and location search
   - **Geocoding API** - For address to coordinates conversion (optional)
   - **Directions API** - For route directions (optional)

### Step 3: Create an API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API Key**
3. Your API key will be created and displayed
4. **Important**: Click **Edit API Key** (pencil icon)

### Step 4: Restrict Your API Key (IMPORTANT for Security)

#### Application Restrictions

1. Under **Application restrictions**, select:
   - **HTTP referrers (web sites)** for production
   - **None** for development (but restrict for production!)

2. If you selected HTTP referrers, add your domains:

   ```
   http://localhost:3000/*
   https://yourdomain.com/*
   https://*.yourdomain.com/*
   https://*.vercel.app/*
   ```

#### API Restrictions

1. Under **API restrictions**, select **Restrict key**
2. Select only the APIs you need:
   - Maps JavaScript API ✓ (required)
   - Places API ✓ (required for hospital finder)
   - Geocoding API ✓ (optional)
   - Directions API ✓ (optional)

3. Click **Save**

### Step 5: Set Up Billing (Required)

Google Maps requires a billing account but offers generous free tier:

- **$200 free credit per month**
- Maps JavaScript API: First 28,000 map loads per month are free
- Places API (Nearby Search): $32 per 1,000 requests (uses free credit)
- Places API (Place Details): $17 per 1,000 requests (uses free credit)
- Most small to medium apps stay within free tier

**Note**: The Hospital Finder feature uses Places API to fetch real-time hospital data from Google Maps.

1. Go to **Billing** in the Cloud Console
2. Click **Link a billing account**
3. Follow the prompts to add payment method
4. Google won't charge you until you exceed the free tier

### Step 6: Add API Key to Your Environment

1. Copy your API key from the Credentials page

2. **For Local Development:**
   - Create or edit `.env.local` in your project root:

   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **For Vercel Deployment:**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
     - **Value**: Your API key
     - **Environment**: Production, Preview, Development (check all)
   - Click **Save**
   - Redeploy your application

4. **For Other Platforms:**
   - Add the environment variable in your platform's dashboard
   - Ensure the variable name is exactly: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Step 7: Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to:
   - `/emergency` - Should show Google Map with your location
   - `/hospitals` - Should show Google Map with real nearby hospitals from Google Places API

3. Check the browser console for any errors
   - If you see "Google Maps API key is not set", double-check your `.env.local` file
   - If you see "This API project is not authorized to use this API", ensure both Maps JavaScript API and Places API are enabled

## Common Issues and Solutions

### Issue: Map Not Showing

**Solution:**

- Check browser console for errors
- Verify API key is set correctly in environment variables
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Check that your domain is whitelisted in API key restrictions

### Issue: "RefererNotAllowedMapError"

**Solution:**

- Go to Google Cloud Console → Credentials
- Edit your API key
- Under HTTP referrer restrictions, add your domain:

  ```
  http://localhost:3000/*
  https://yourdomain.com/*
  ```

### Issue: "This page can't load Google Maps correctly"

**Solution:**

- Usually means billing is not enabled
- Go to Google Cloud Console → Billing
- Link a billing account (you won't be charged within free tier)

### Issue: Map Shows Gray Box

**Solution:**

- API key might be restricted incorrectly
- Temporarily set API restrictions to "None" to test
- If that works, carefully re-add restrictions one at a time

## Monitoring Usage and Costs

### Check Your Usage

1. Go to **APIs & Services** → **Dashboard**
2. View API usage graphs
3. Monitor requests to stay within free tier

### Set Up Budget Alerts

1. Go to **Billing** → **Budgets & alerts**
2. Click **Create Budget**
3. Set alert threshold (e.g., $10)
4. Add email notification

### Free Tier Limits (Monthly)

- **Maps JavaScript API**: 28,000 loads (covered by $200 credit)
- **Places API**:
  - Nearby Search: ~6,250 requests ($200 / $32 per 1,000)
  - Place Details: ~11,700 requests ($200 / $17 per 1,000)
  - Autocomplete: 1,000 requests
- **Geocoding API**: 40,000 requests
- **Directions API**: 40,000 requests

**Hospital Finder Usage**: Each hospital search uses 1 Nearby Search request. For most healthcare apps with moderate traffic, you'll stay well within free limits.

## Best Practices

### 1. Environment Variables

- Never commit API keys to Git
- Add `.env.local` to `.gitignore`
- Use different keys for development and production

### 2. Security

- Always restrict your API keys
- Use HTTP referrer restrictions for web apps
- Regularly rotate API keys
- Monitor usage for unusual activity

### 3. Performance

- Lazy load maps (already implemented in components)
- Cache geocoding results when possible
- Use map clustering for many markers

### 4. Cost Optimization

- Implement client-side caching
- Avoid unnecessary API calls
- Use static maps for thumbnails
- Consider Places API alternatives for simple searches

## Alternative: Development Without API Key

If you want to develop without setting up Google Maps immediately, the app will show a fallback message. However, the map functionality will not work.

To test basic functionality without maps:

1. Comment out map components temporarily
2. Use mock location data
3. Set up Google Maps when ready for production

## Support Resources

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Billing & Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
- [Google Maps Platform Support](https://developers.google.com/maps/support)

## Summary Checklist

- [ ] Create Google Cloud Project
- [ ] Enable Maps JavaScript API
- [ ] Enable Places API (**required for hospital finder**)
- [ ] Create API Key
- [ ] Restrict API Key (HTTP referrers + API restrictions)
- [ ] Set up billing account
- [ ] Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to `.env.local`
- [ ] Add environment variable to Vercel/deployment platform
- [ ] Test on `/emergency` page
- [ ] Test on `/hospitals` page (should show real nearby hospitals)
- [ ] Set up budget alerts
- [ ] Verify maps load correctly

Once completed, your Health World app will have fully functional Google Maps integration with accurate location tracking and **real-time hospital data from Google Places API**! 🗺️🏥
