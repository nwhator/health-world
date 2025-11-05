# Getting Started with Health World

## Quick Start Guide

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- NextAuth.js
- Lucide Icons
- Leaflet (for maps)
- And more...

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add the required values:

```env
# Required
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-this-with-openssl-rand-base64-32

# Optional - for Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional - for Stripe payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Explore the Application

#### Pages to Visit

**Public Pages:**
- **Home**: <http://localhost:3000>
- **Emergency**: <http://localhost:3000/emergency>
- **Ambulance Tracking**: <http://localhost:3000/ambulance>
- **Services**: <http://localhost:3000/services>
- **Telemedicine**: <http://localhost:3000/telemedicine>
- **Pharmacy**: <http://localhost:3000/pharmacy>
- **About**: <http://localhost:3000/about>
- **Contact**: <http://localhost:3000/contact>
- **Careers**: <http://localhost:3000/careers>
- **Help Center**: <http://localhost:3000/help>
- **Sign In**: <http://localhost:3000/auth/signin>
- **Sign Up**: <http://localhost:3000/auth/signup>

**Provider Pages:**
- **Provider Registration**: <http://localhost:3000/provider/register>

**Protected Pages (require authentication):**
- **Profile**: <http://localhost:3000/profile>
- **Appointments**: <http://localhost:3000/appointments>
- **Health Records**: <http://localhost:3000/health-records>
- **Notifications**: <http://localhost:3000/notifications>

#### Test Credentials

Since we're using mock authentication, you can sign in with any email/password combination.

Example:

- Email: `patient@healthworld.com`
- Password: `any-password`

### 5. Understanding the Project Structure

```md
health-world/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── emergency/         # Emergency module
│   ├── services/          # Healthcare services
│   ├── profile/           # User profile
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── emergency/        # Emergency-specific
│   └── notifications/    # Notification system
├── lib/                   # Utilities
│   ├── mock-data.ts      # Sample data
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript types
```

## Features Overview

### 1. Emergency Assistance

- One-tap emergency calls (Fire, Ambulance, Police)
- Automatic location detection
- Interactive map showing your location
- Panic button for immediate help

**Try it:** Visit `/emergency` and allow location access

### 2. At-Home Healthcare Services

- Browse available services
- Book appointments (one-time or subscription)
- Choose date, time, and location
- Track appointment status

**Try it:** Visit `/services` and click "Book Once" or "Subscribe"

### 3. User Authentication

- Email/password sign in
- Google OAuth (when configured)
- Protected routes
- Session management

**Try it:** Visit `/auth/signin`

### 4. User Profile

- View and edit personal information
- See appointment history
- Check reviews and ratings
- Activity statistics

**Try it:** Visit `/profile` (after signing in)

### 5. Notifications

- Appointment reminders
- Emergency alerts
- Health tips
- Real-time updates

**Try it:** Click the bell icon in the navigation bar

### 6. C2C Marketplace (Consumer-to-Consumer)

Health World operates as a marketplace connecting patients with verified healthcare providers:

**For Patients:**
- Browse verified doctors, dentists, nurses, physiotherapists, and more
- Read reviews and ratings from other patients
- Book appointments or request at-home services
- Pay securely through the platform
- Track service history

**For Healthcare Providers:**
- Register at `/provider/register`
- Submit professional credentials for verification
- Set your own services, pricing, and availability
- Receive bookings from patients across Africa
- Get paid weekly with low commission (10-15%)

**Try it:** Visit `/provider/register` to see the provider registration process

### 7. Multi-Currency Support

Automatic currency detection based on your location:
- 🇳🇬 Nigeria - Naira (₦)
- 🇬🇭 Ghana - Cedi (₵)
- 🇰🇪 Kenya - Shilling (KSh)
- 🇿🇦 South Africa - Rand (R)
- And 5 more African countries

**Try it:** Check the currency selector in the navbar

## Development Tips

### Hot Reload

The dev server supports hot module replacement. Changes to files will automatically refresh the browser.

### TypeScript

The project is fully typed. Your IDE should provide autocomplete and type checking.

### Tailwind CSS

Use Tailwind utility classes for styling. The configuration is in `tailwind.config.ts`.

Custom classes are defined in `app/globals.css`:

- `.container-custom` - Container with responsive padding
- `.card` - Card component base styles
- `.btn-primary`, `.btn-secondary`, etc. - Button variants

### Adding New Pages

1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. The route is automatically created

Example:

```md
app/
└── my-page/
    └── page.tsx  → becomes /my-page
```

### Adding New Components

1. Create component in `components/`
2. Use TypeScript for props
3. Export as default or named export

Example:

```typescript
// components/MyComponent.tsx
export function MyComponent({ title }: { title: string }) {
  return <div>{title}</div>
}
```

## Common Tasks

### Install New Package

```bash
npm install package-name
```

### Build for Production

```bash
npm run build
npm start
```

### Run Linter

```bash
npm run lint
```

### Format Code

Most IDEs auto-format on save. Configure your editor to use the project's settings.

## Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#1E90FF', // Change this
  },
  // ...
}
```

### Change Fonts

Edit `app/layout.tsx`:

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})
```

### Add New Service

Edit `lib/mock-data.ts`:

```typescript
export const mockServices: Service[] = [
  {
    id: '4',
    name: 'Your New Service',
    type: 'custom-service',
    // ...
  }
]
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in your IDE
# Or run type check manually
npx tsc --noEmit
```

### Styles Not Updating

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Next Steps

1. **Configure OAuth**: Set up Google OAuth in Google Cloud Console
2. **Set up Database**: Replace mock data with Prisma + PostgreSQL
3. **Configure Stripe**: Add your Stripe keys for payments
4. **Deploy**: Push to GitHub and deploy on Vercel

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [NextAuth.js Guide](https://next-auth.js.org/)
- [Framer Motion](https://www.framer.com/motion/)

## Need Help?

- Check the README.md for detailed documentation
- Review the code comments in components
- Check the Next.js and Tailwind documentation
- Open an issue on GitHub

---

Happy coding! 🚀
