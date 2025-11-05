# Deployment Guide - Health World

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- GitHub account with the health-world repository
- Vercel account (free tier available)

### Step-by-Step Deployment

#### 1. Push Code to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your `health-world` repository from GitHub
4. Vercel will auto-detect Next.js configuration

#### 3. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

**Required:**

```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
```

**Optional (for Google OAuth):**

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Optional (for Stripe):**

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

**Optional (for Database):**

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

#### 4. Update Google OAuth Settings

If using Google OAuth, add production URLs:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your project → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:

   ```
   https://your-domain.vercel.app
   ```

5. Add to **Authorized redirect URIs**:

   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

#### 5. Deploy

Click "Deploy" in Vercel. The build process will:
- Install dependencies with `--legacy-peer-deps`
- Build the Next.js application
- Deploy to a production URL

#### 6. Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` to your custom domain

## Alternative Deployment Options

### Deploy to Netlify

1. **Install Netlify CLI**:

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:

   ```bash
   npm run build
   ```

3. **Deploy**:

   ```bash
   netlify deploy --prod
   ```

4. **Configure Build Settings** in Netlify dashboard:
   - Build command: `npm install --legacy-peer-deps && npm run build`
   - Publish directory: `.next`

### Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Railway auto-deploys on push

### Deploy to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Configure build settings:

   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install --legacy-peer-deps
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

## Production Checklist

Before deploying to production, ensure:

### Security

- [ ] `NEXTAUTH_SECRET` is a strong, randomly generated value
- [ ] Google OAuth credentials are production keys (not test)
- [ ] Stripe keys are live keys (not test mode)
- [ ] Environment variables are set in deployment platform
- [ ] `.env.local` is **NOT** committed to Git
- [ ] Database credentials are secure

### Functionality

- [ ] All pages load without errors
- [ ] Authentication works (email + Google)
- [ ] Currency detection works
- [ ] GPS/location features work (HTTPS required)
- [ ] Forms submit successfully
- [ ] Responsive design on mobile/tablet/desktop

### Performance

- [ ] Images are optimized (Next.js Image component)
- [ ] No console errors or warnings
- [ ] Page load times are acceptable
- [ ] Lighthouse score > 90

### SEO & Analytics

- [ ] Meta tags configured (`layout.tsx`)
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics integrated (Google Analytics, Plausible, etc.)

### Database

- [ ] Production database set up (PostgreSQL recommended)
- [ ] Prisma migrations applied
- [ ] Database backups configured
- [ ] Connection pooling enabled

## Environment Variables Reference

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Your production URL | `https://healthworld.com` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | `<random-32-char-string>` |

### Optional Services

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | [Google Cloud Console](https://console.cloud.google.com) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | [Google Cloud Console](https://console.cloud.google.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | [Stripe Dashboard](https://dashboard.stripe.com) |
| `STRIPE_SECRET_KEY` | Stripe secret key | [Stripe Dashboard](https://dashboard.stripe.com) |
| `DATABASE_URL` | PostgreSQL connection string | Your database provider |

## Troubleshooting Deployment

### Build Fails with Dependency Error

**Error**: `ERESOLVE could not resolve`

**Solution**: The `.npmrc` file should contain `legacy-peer-deps=true`. If it's missing:

```bash
echo "legacy-peer-deps=true" > .npmrc
git add .npmrc
git commit -m "Add npmrc for Vercel deployment"
git push
```

### Authentication Not Working in Production

**Issue**: NextAuth.js errors in production

**Solutions**:
1. Ensure `NEXTAUTH_URL` matches your exact production URL
2. Generate a new `NEXTAUTH_SECRET` for production
3. Check that callbacks are properly configured in Google OAuth

### GPS/Location Not Working

**Issue**: Geolocation requires HTTPS

**Solution**: 
- Modern browsers require HTTPS for `navigator.geolocation`
- Vercel/Netlify provide HTTPS automatically
- For custom domains, ensure SSL certificate is active

### Database Connection Errors

**Issue**: Can't connect to database

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check database allows connections from deployment platform IP
3. For Vercel, enable connection pooling (use Prisma Data Proxy or PgBouncer)

### Environment Variables Not Loading

**Issue**: `process.env.VARIABLE_NAME` is undefined

**Solutions**:
1. Ensure variables are added in deployment platform dashboard
2. Redeploy after adding new variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

## Post-Deployment Tasks

### 1. Test All Features

- Sign up with new account
- Test Google OAuth
- Book an appointment
- Test emergency GPS
- Try all payment flows

### 2. Monitor Performance

- Set up error tracking (Sentry, LogRocket)
- Monitor with Vercel Analytics or similar
- Set up uptime monitoring (UptimeRobot, Pingdom)

### 3. SEO Setup

- Submit sitemap to Google Search Console
- Set up Google Analytics
- Configure social media meta tags
- Add schema.org structured data

### 4. Enable Database Backups

- Set up automated backups
- Test restore procedure
- Document backup/restore process

## Continuous Deployment

Once set up, every push to `main` branch will automatically:

1. Trigger a new build on Vercel
2. Run tests (if configured)
3. Deploy to production
4. Invalidate CDN cache

### Branch Previews

Vercel creates preview URLs for pull requests:
- Each PR gets a unique preview URL
- Test changes before merging
- Share with team for review

## Scaling Considerations

As your app grows:

### Database
- Upgrade to larger database instance
- Enable connection pooling
- Add read replicas for heavy read operations

### Caching
- Implement Redis for session storage
- Cache frequently accessed data
- Use CDN for static assets

### Monitoring
- Set up APM (Application Performance Monitoring)
- Track error rates and response times
- Monitor database query performance

## Support

For deployment issues:
- [Vercel Support](https://vercel.com/support)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Ready to deploy?** Push your code to GitHub and import to Vercel! 🚀
