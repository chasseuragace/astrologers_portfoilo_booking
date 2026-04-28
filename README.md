# Astrologer Website

A bilingual (English/Nepali) React application built with Clean Architecture principles for managing astrology services and bookings.

## Architecture

This project follows **Clean Architecture** with strict separation of concerns:

- **Domain Layer**: Pure business logic (entities, use cases, repository interfaces)
- **Data Layer**: Data models, repository implementations (fake/real), data sources
- **Presentation Layer**: UI components, hooks, pages
- **Feature Modules**: Self-contained modules (booking, service, public, admin) with their own domain/data/presentation layers

All data flows through use cases and repositories - no direct data access from UI components.

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM with feature registry pattern
- **i18n**: react-i18next
- **Icons**: Lucide React
- **Date Handling**: nepali-date-converter

## Project Structure

```
astrologer-website/
├── src/
│   ├── components/           # Shared UI components
│   ├── config/              # Configuration files
│   ├── core/
│   │   ├── routing/         # Feature registry and routing
│   │   └── context/         # Repository context providers
│   ├── features/            # Feature modules (Clean Architecture)
│   │   ├── booking/
│   │   │   ├── domain/      # Entities, use cases, repository interfaces
│   │   │   ├── data/        # Models, repository implementations
│   │   │   └── presentation/# Components, hooks, pages
│   │   ├── service/
│   │   ├── public/
│   │   └── admin/
│   ├── firebase/            # Firebase auth integration
│   ├── i18n/                # Translations (en, np)
│   └── App.tsx              # Main entry point
└── dist/                    # Production build
```

## Feature Modules

Each feature module is self-contained with:

- **Domain**: `entities/`, `repositories/`, `usecases/`
- **Data**: `models/`, `repositories/` (fake/impl)
- **Presentation**: `components/`, `hooks/`, `pages/`
- **Module file**: Exports descriptor, routes, and public API

### Current Features

- **Booking**: Appointment scheduling with status management
- **Service**: Bilingual service listings (titleEn, titleNp, descriptionEn, descriptionNp)
- **Public**: Static pages (Home, About, Services, Calendar, Contact, My Bookings)
- **Admin**: Admin dashboard and login

## Routing

Routes are centralized in `src/core/routing/feature-registry.ts`. Each feature module exports its routes and descriptor, which are registered in the registry. `App.tsx` uses only the registry - no manual route definitions.

## Data Flow

1. UI component calls a hook (e.g., `useServiceList`)
2. Hook uses a use case (e.g., `GetAllServicesUseCase`)
3. Use case calls repository interface
4. Repository implementation (fake/real) fetches data
5. Data flows back through layers to UI

## Development

```bash
cd astrologer-website
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Production URL: https://shaligram-guru.netlify.app

Deploy via Netlify:
```bash
bash deploy.sh
```

Or manually:
```bash
npm run build
netlify deploy --prod --dir=dist
```

## i18n

- Default language: Nepali (`np`)
- Fallback: English (`en`)
- Translation files: `src/i18n/locales/`
- **Note**: Service content is stored in the Service entity (bilingual fields), not in i18n files. i18n is used only for static UI text (navigation, labels, buttons).

## Bilingual Data Model

Service entities store bilingual content directly:
- `titleEn`, `titleNp`: Service titles in both languages
- `descriptionEn`, `descriptionNp`: Descriptions in both languages
- UI selects language based on `i18n.language === 'np'`

## License

MIT
