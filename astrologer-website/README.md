# Astrologer Website - Shaligram Dahal

A React-based website for Shaligram Dahal, an astrologer/guru based in Biratnagar, Nepal. The website allows visitors to explore astrology-related services, view a Nepali calendar, and send booking requests. An admin panel allows the astrologer to approve or reject bookings and manage the site.

## Features

### Public Website
- **Home Page**: Profile introduction with call-to-action buttons
- **About Page**: Detailed information about Guru Shaligram Dahal
- **Services Page**: List of astrology services with pricing
- **Calendar Page**: Nepali Bikram Sambat calendar showing booking availability
- **Contact Page**: Contact information with QR code for vCard
- **Booking Form**: Appointment request form with Nepali date support

### Admin Panel
- **Login**: Secure admin authentication (demo: admin@example.com / admin123)
- **Dashboard**: Overview of booking statistics and quick actions
- **Booking Management**: View, approve, reject, and manage booking requests
- **Service Management**: Update service offerings
- **Profile Settings**: Manage contact information and social links

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **Architecture**: Clean Architecture (domain/data/presentation layers) using scaffolder

## Project Structure

The project follows Clean Architecture principles with domain/data/presentation layers:

```
src/
├── core/                 # Core utilities and routing
│   ├── errors/          # Error handling
│   ├── usecase/         # Base use case
│   ├── components/      # Shared components
│   └── routing/         # Feature registry
├── features/            # Feature modules
│   ├── booking/         # Booking feature
│   │   ├── domain/      # Entities, repositories, use cases
│   │   ├── data/        # Models, repository implementations
│   │   └── presentation/# Pages, components, hooks
│   ├── service/         # Service feature
│   └── profile/         # Profile feature
├── pages/               # Page components
│   ├── public/          # Public-facing pages
│   └── admin/           # Admin panel pages
├── components/          # Shared UI components
└── lib/                 # Utilities
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Admin Access

For demo purposes, use these credentials:
- **Email**: admin@example.com
- **Password**: admin123

## Features Implemented

- ✅ Clean Architecture with domain/data/presentation layers
- ✅ Booking system with status management (Pending, Approved, Rejected, Completed, Cancelled)
- ✅ Service management
- ✅ Profile/contact management
- ✅ Nepali calendar (Bikram Sambat) display
- ✅ Booking form with Nepali date input
- ✅ QR code for vCard contact information
- ✅ Admin dashboard with statistics
- ✅ Responsive design with Tailwind CSS
- ✅ React Router navigation

## Future Enhancements

- Firebase/Firestore backend integration
- Real-time booking updates
- Email notifications for booking confirmations
- SMS verification
- Nepali date picker integration
- Payment gateway integration
- Video consultation support

## License

This project is proprietary software for Shaligram Dahal.
