# Astrologer Website - Shaligram Dahal

A professional astrology and spiritual guidance website for Guru Shaligram Dahal, featuring booking management, service listings, and a Nepali calendar system.

## 🌟 Live Demo

**Production URL:** https://shaligram-guru.netlify.app

## ✨ Features

- **Multi-language Support** (Nepali & English) with i18n
- **Service Listings** - 9 comprehensive astrology services
- **Booking System** - Appointment scheduling with Nepali date picker
- **Admin Dashboard** - Manage bookings and services
- **Nepali Calendar** - Traditional date tracking
- **Responsive Design** - Mobile-first cosmic theme

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom cosmic theme
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **i18n:** React i18next with browser language detection
- **Icons:** Lucide React
- **Build:** Netlify with SPA redirects

## 📁 Project Structure

```
astrologer-website/
├── src/
│   ├── components/         # Reusable UI components
│   ├── features/          # Feature modules (booking, service)
│   ├── i18n/              # Translations (en, np)
│   ├── pages/             # Public & Admin pages
│   └── core/              # Utilities, hooks, types
├── dist/                  # Production build
├── netlify.toml           # Deployment config
└── deploy.sh              # Deployment script
```

## 🚀 Quick Start

```bash
cd astrologer-website
npm install
npm run dev
```

## 📦 Deployment

### Using deploy script:
```bash
bash deploy.sh
```

### Manual Netlify deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🔧 Configuration

Create `.env` file:
```env
NETLIFY_AUTH_TOKEN=your_token
NETLIFY_SITE_ID=your_site_id
```

## 📝 Services Offered

1. Kundali / Horoscope Consultation
2. Vastu Consultation
3. Shraddha / Ritual Guidance
4. Puja Consultation
5. Marriage/Muhurat Consultation
6. Birth Chart Creation
7. Guna Milan / Marriage Compatibility
8. Brata Udhyapan & Puran Path
9. Shanti Puja (Moola Janit, Mangalika)

## 🌐 i18n

Default language: **Nepali** (`np`)
Fallback: English (`en`)

Translation files: `src/i18n/locales/`

## 📄 License

MIT License - Free for personal and commercial use.

---

**Contact:** Guru Shaligram Dahal, Biratnagar, Nepal
