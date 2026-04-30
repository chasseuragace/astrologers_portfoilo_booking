# Astrologer Website

A bilingual (English/Nepali) React application built with Clean Architecture principles for managing astrology services and bookings.

## Features

### Public Website
- **Home Page**: Profile introduction with featured services
- **About Page**: Detailed information about Guru Shaligram Dahal
- **Services Page**: List of 9 astrology services with bilingual descriptions
- **Calendar Page**: Nepali Bikram Sambat calendar with booking form
- **Contact Page**: Contact information with QR code for vCard
- **My Bookings**: View customer booking requests

### Admin Panel
- **Login**: Firebase authentication
- **Dashboard**: Overview of booking statistics and quick actions
- **Booking Management**: View, approve, reject bookings at /admin/bookings

## Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM with feature registry pattern
- **i18n**: react-i18next
- **Icons**: Lucide React
- **Date Handling**: nepali-date-converter
- **Auth**: Firebase Authentication
- **Architecture**: Clean Architecture (domain/data/presentation layers)

## Project Structure

The project follows Clean Architecture with self-contained feature modules:

```
src/
├── components/           # Shared UI components
├── config/              # Configuration files
├── core/
│   ├── routing/         # Feature registry and routing
│   └── context/         # Repository context providers
├── features/            # Feature modules (Clean Architecture)
│   ├── booking/         # Booking feature
│   │   ├── domain/      # Entities, use cases, repository interfaces
│   │   ├── data/        # Models, repository implementations
│   │   └── presentation/# Components, hooks, pages
│   ├── service/         # Service feature (bilingual listings)
│   ├── public/          # Public pages (Home, About, Services, Calendar, Contact)
│   └── admin/           # Admin pages (Login, Dashboard)
├── firebase/            # Firebase auth integration
├── i18n/                # Translations (en, np) - static UI text only
└── App.tsx              # Main entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Built files will be in the `dist` directory.

## Architecture

This project follows **Clean Architecture** with strict separation of concerns:

- **Domain Layer**: Pure business logic (entities, use cases, repository interfaces)
- **Data Layer**: Data models, repository implementations (fake/real), data sources
- **Presentation Layer**: UI components, hooks, pages
- **Feature Modules**: Self-contained modules with their own domain/data/presentation layers

All data flows through use cases and repositories - no direct data access from UI components.

## Routing

Routes are centralized in `src/core/routing/feature-registry.ts`. Each feature module exports its routes and descriptor, which are registered in the registry. `App.tsx` uses only the registry - no manual route definitions.

## Bilingual Data Model

Service entities store bilingual content directly:
- `titleEn`, `titleNp`: Service titles in both languages
- `descriptionEn`, `descriptionNp`: Descriptions in both languages
- UI selects language based on `i18n.language === 'np'`

i18n files contain only static UI text (navigation, labels, buttons), not service content.

## AI Optimization

The site includes `/llms.txt` at the root for AI visibility (like robots.txt for LLMs). This file provides AI systems with a curated map of important content when users paste URLs into ChatGPT, Claude, or Perplexity.

## Image Optimization

The project includes an automatic image optimization step that runs after every build. It uses `sharp` to compress JPEG, PNG, and WebP images in the `dist` folder, ensuring faster load times and smaller deployment sizes.

To run it manually:
```bash
npm run optimize-images
```

## Deployment

Production URL: https://shaligram-guru.netlify.app

Deploy via Netlify:
```bash
bash deploy.sh
```

## License

This project is proprietary software for Shaligram Dahal.
