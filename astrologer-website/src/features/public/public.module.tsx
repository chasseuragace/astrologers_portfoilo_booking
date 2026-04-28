/* eslint-disable react-refresh/only-export-components */
/// Module exports for Public pages.
export { HomePage } from './presentation/pages/HomePage';
export { AboutPage } from './presentation/pages/AboutPage';
export { ServicesPage } from './presentation/pages/ServicesPage';
export { CalendarPage } from './presentation/pages/CalendarPage';
export { ContactPage } from './presentation/pages/ContactPage';
export { CustomerBookingsPage } from './presentation/pages/CustomerBookingsPage';

import { HomePage } from './presentation/pages/HomePage';
import { AboutPage } from './presentation/pages/AboutPage';
import { ServicesPage } from './presentation/pages/ServicesPage';
import { CalendarPage } from './presentation/pages/CalendarPage';
import { ContactPage } from './presentation/pages/ContactPage';
import { CustomerBookingsPage } from './presentation/pages/CustomerBookingsPage';

export const PublicDescriptor = {
  id: 'public',
  title: 'Public Pages',
  path: '/',
};

export const PublicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/my-bookings',
    element: <CustomerBookingsPage />,
  },
];
