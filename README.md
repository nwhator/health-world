# Health World - Healthcare Service Platform

## Health World 🏥

A modern, full-stack healthcare service web application built with Next.js 16, TypeScript, and Tailwind CSS. **Designed for Nigeria and other African countries** with automatic currency detection.

## 🌍 Multi-Currency Support

The app automatically detects your location and displays prices in your local currency:

### Supported Countries & Currencies

- 🇳🇬 **Nigeria** - Nigerian Naira (₦)
- 🇬🇭 **Ghana** - Ghanaian Cedi (₵)
- 🇰🇪 **Kenya** - Kenyan Shilling (KSh)
- 🇿🇦 **South Africa** - South African Rand (R)
- 🇪🇬 **Egypt** - Egyptian Pound (E£)
- 🇪🇹 **Ethiopia** - Ethiopian Birr (Br)
- 🇹🇿 **Tanzania** - Tanzanian Shilling (TSh)
- 🇺🇬 **Uganda** - Ugandan Shilling (USh)
- 🇷🇼 **Rwanda** - Rwandan Franc (FRw)

**Features:**

- Automatic location-based currency detection
- Manual currency selector in the navigation bar
- Real-time price conversion based on current exchange rates
- Persistent currency selection (saved in browser)
- All prices automatically converted across the entire app

## 🌟 Features

### Core Modules

#### 1. **Emergency Assistance** 🚨

- One-tap emergency calls (Fire, Ambulance, Police)
- **Real-time geolocation** with high accuracy GPS tracking
- Reverse geocoding to display actual street addresses
- Location accuracy indicator (±meters)
- Universal panic button for life-threatening situations
- Safety tips and emergency guidelines

#### 2. **Ambulance Tracking** 🚑

- Real-time ambulance location tracking
- Live ETA updates
- Distance-to-destination display
- Driver information and direct contact
- Emergency timeline tracking
- Interactive map with live updates

#### 3. **Telemedicine** 💻

- Virtual consultations with verified doctors
- Video and audio call options
- Doctor profiles with ratings and reviews
- Multiple specialties available
- Instant booking system
- Multi-language support

#### 4. **Online Pharmacy** 💊

- Browse and order medicines
- Category-based filtering
- Shopping cart functionality
- Prescription requirements indicator
- Free delivery on orders over $50
- Real-time stock availability
- Medicine ratings and reviews

#### 5. **At-Home Care Services** 🏠

- Dental checkups
- Blood pressure monitoring
- Physiotherapy sessions
- General consultations
- Service booking with date/time selection
- Real-time provider tracking

#### 6. **Health Records** 📋

- Digital medical records management
- Lab results, prescriptions, imaging reports
- Vital signs tracking (BP, heart rate, blood sugar, temperature)
- Document upload and download
- Category-based organization
- Search and filter capabilities

#### 7. **Appointments** 📅

- Complete booking history
- Upcoming, in-progress, and completed appointments
- Appointment rescheduling and cancellation
- Status tracking
- Payment information
- Receipt generation

#### 8. **Notifications** 🔔

- Real-time alerts for appointments
- Medication reminders
- Emergency updates
- Health tips
- Mark as read/unread functionality
- Priority-based notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Geolocation**: Browser Geolocation API + OpenStreetMap Nominatim

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nwhator/health-world.git
cd health-world
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
health-world/
├── app/                      # Next.js App Router pages
│   ├── ambulance/           # Ambulance tracking
│   ├── appointments/        # Appointment management
│   ├── auth/               # Authentication pages
│   ├── emergency/          # Emergency assistance
│   ├── health-records/     # Medical records
│   ├── notifications/      # Notifications center
│   ├── pharmacy/           # Online pharmacy
│   ├── services/           # At-home care services
│   ├── telemedicine/       # Virtual consultations
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── ui/                # UI component library
│   ├── layout/            # Layout components
│   ├── emergency/         # Emergency-specific components
│   └── notifications/     # Notification components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── types/                # TypeScript types
└── public/               # Static assets
```

## 🎨 Design System

### Colors

- **Primary**: Blue (#1E90FF) - Trust and healthcare
- **Secondary**: Red (#FF3B30) - Emergency and alerts
- **Accent**: Green (#00C851) - Success and active states
- **Base**: White - Clean backgrounds

### Typography

- **Font Family**: Inter / Poppins
- **Heading**: Bold, large sizes
- **Body**: Regular weight, readable sizes

### Components

- Consistent rounded corners (0.5rem)
- Soft shadows for depth
- Smooth transitions and animations
- Responsive breakpoints (sm, md, lg, xl)

## 🔐 Security Features

- NextAuth.js authentication
- Secure session management
- Environment variable protection
- HTTPS in production
- Input validation with Zod
- SQL injection prevention (Prisma)

## 🌍 Location Services

The app uses:

1. **Browser Geolocation API** for accurate GPS coordinates
2. **High accuracy mode** for better precision
3. **OpenStreetMap Nominatim** for reverse geocoding
4. **Real-time accuracy indicators** (color-coded by precision)

### Location Accuracy Levels

- 🟢 Green: < 100m (Excellent)
- 🟡 Yellow: 100-500m (Good)
- 🟠 Orange: 500-1000m (Fair)
- 🔴 Red: > 1000m (Poor)

## 📱 Responsive Design

Fully responsive across:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- High contrast color ratios
- Screen reader friendly
- Focus indicators

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **nwhator** - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Lucide for the beautiful icons
- OpenStreetMap for geolocation services

## 📞 Support

For support, email <support@healthworld.com> or open an issue in the repository.

---

**Built with ❤️ for better healthcare access** Health World provides emergency assistance and at-home healthcare services with a professional, accessible, and responsive UI.

## 🚀 Features

### Core Functionality

- **Emergency Assistance** - One-tap emergency calls for Fire, Ambulance, and Police with real-time location sharing
- **At-Home Care Services** - Book professional healthcare services (Dental, Blood Pressure, Physiotherapy, etc.)
- **User Profiles** - Separate profiles for Patients, Healthcare Providers, and Pharmacies
- **Verification System** - Professional credential upload and admin verification
- **Payment Integration** - Stripe integration for subscriptions and one-time payments
- **Ratings & Reviews** - Patient feedback system for healthcare providers
- **Real-time Notifications** - Appointment reminders, emergency alerts, and health tips
- **Live Tracking** - Track assigned care workers in real-time

### Technical Features

- Server-side rendering with Next.js 16 App Router
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Framer Motion animations
- Form validation with React Hook Form + Zod
- Authentication with NextAuth.js (Email & Google OAuth)
- State management with Zustand
- API routes for backend logic

## 🎨 Design System

**Colors:**

- Primary: Blue (#1E90FF) - Medical trust and professionalism
- Secondary: Red (#FF3B30) - Emergency and alerts
- Accent: Green (#00C851) - Success and active states
- Base: White - Clean backgrounds

**Typography:** Inter (primary) & Poppins (headings)

**UI Principles:**

- Clean, minimal layouts
- Medical-grade aesthetics
- Consistent spacing and rounded edges
- Soft shadows for depth
- Accessible color contrast

## 📁 Project Structure

```md
health-world/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth configuration
│   │   ├── appointments/ # Booking endpoints
│   │   ├── emergency/    # Emergency request handling
│   │   ├── services/     # Service listings
│   │   └── reviews/      # Rating and review endpoints
│   ├── auth/             # Authentication pages
│   ├── emergency/        # Emergency assistance module
│   ├── services/         # At-home care services
│   ├── profile/          # User profile management
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Textarea.tsx
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── emergency/        # Emergency-specific components
│       └── EmergencyMap.tsx
├── lib/
│   ├── mock-data.ts      # Mock data for development
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts          # TypeScript type definitions
└── public/               # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/health-world.git
   cd health-world
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   - NEXTAUTH_SECRET (generate with `openssl rand -base64 32`)
   - Google OAuth credentials (optional)
   - Stripe API keys (optional)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages Overview

### Home (`/`)

- Hero section with quick access buttons
- Service grid showcasing all available healthcare services
- Feature highlights (24/7 availability, verified professionals, quality service)
- Call-to-action section

### Emergency (`/emergency`)

- One-tap emergency call buttons (Fire, Ambulance, Police)
- Real-time location detection and display
- Interactive map with user location
- Universal panic button
- Safety tips section

### Services (`/services`)

- Grid of at-home healthcare services
- Service details with pricing (one-time and subscription)
- Booking modal with date, time, and address selection
- "How It Works" guide

### Profile (`/profile`)

- User information management
- Appointment history with status tracking
- Reviews and ratings
- Activity statistics

### Authentication

- Sign In (`/auth/signin`)
- Sign Up (`/auth/signup`)
- Email and Google OAuth support

## 🔐 Authentication

The app uses NextAuth.js for authentication with multiple providers:

### Available Sign-In Methods

1. **Email/Password** - Traditional account creation
   - Sign up at `/auth/signup`
   - Password requirements: minimum 8 characters
   - Secure password hashing with bcrypt

2. **Google OAuth** - One-click authentication
   - Click "Continue with Google" on signup or signin pages
   - No password needed
   - Automatic account creation on first sign-in

### Setup Instructions

**For Email/Password**: Works out of the box (mock implementation)

**For Google OAuth**: Follow the [Google OAuth Setup Guide](./GOOGLE_OAUTH_SETUP.md) to:
- Create a Google Cloud project
- Configure OAuth consent screen
- Get your Client ID and Client Secret
- Update `.env.local` with your credentials

### Protected Routes

Certain pages require authentication:
- Profile settings
- Appointment history
- Health records
- Payment methods

## 💳 Payment Integration

Stripe integration for:

- One-time service payments
- Monthly subscription plans
- Payment history tracking

Note: Currently in test mode with mock data

## 🗺️ Map Integration

Uses Leaflet and OpenStreetMap for:

- Emergency location tracking
- Service provider location display
- Real-time navigation

## 🎯 Key Components

### UI Components

- **Button** - Multiple variants (primary, secondary, accent, outline, ghost)
- **Card** - Flexible card component with header, content, and footer
- **Input/Textarea** - Form inputs with validation states
- **Modal** - Accessible modal dialogs
- **Navbar/Footer** - Consistent layout across pages

### Features

- **Real-time Location** - Browser geolocation API
- **Form Validation** - React Hook Form + Zod schemas
- **Animations** - Framer Motion for smooth transitions
- **Notifications** - Sonner for toast notifications

## 🚀 Deployment

### Build for production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

```bash
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📊 Mock Data

The application includes mock data for development:

- Sample users (patients, doctors, pharmacies)
- Service listings
- Appointment history
- Reviews and ratings
- Notifications

Replace with actual database queries in production.

## 🔒 Security Considerations

- All user credentials should be hashed (use bcrypt in production)
- Implement CSRF protection
- Validate all API inputs
- Use environment variables for sensitive data
- Implement rate limiting for API routes
- Add SQL injection protection if using SQL databases

## 🎨 Customization

### Tailwind Theme

Edit `tailwind.config.ts` to customize:

- Colors
- Fonts
- Spacing
- Border radius
- Shadows

### Adding New Services

1. Add service to `lib/mock-data.ts`
2. Create dedicated service page in `app/services/[slug]/`
3. Add icon and category

## 📝 Future Enhancements

- [ ] Real database integration (Prisma + PostgreSQL)
- [ ] Push notifications
- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Medicine delivery tracking
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Health World Team**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- OpenStreetMap for map data

---

Built with ❤️ for better healthcare accessibility
