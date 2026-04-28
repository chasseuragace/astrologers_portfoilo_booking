import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './core/routing/feature-registry'
import { HomePage } from './pages/public/HomePage'
import { AboutPage } from './pages/public/AboutPage'
import { ServicesPage } from './pages/public/ServicesPage'
import { CalendarPage } from './pages/public/CalendarPage'
import { ContactPage } from './pages/public/ContactPage'

import { CustomerBookingsPage } from './pages/public/CustomerBookingsPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookingRepositoryProvider, createDefaultBookingRepository } from './features/booking/presentation/booking.repository-context'
import { ProfileRepositoryProvider, createDefaultProfileRepository } from './features/profile/presentation/profile.repository-context'
import { ServiceRepositoryProvider, createDefaultServiceRepository } from './features/service/presentation/service.repository-context'
import { BookingListPage } from './features/booking/presentation/pages/booking-list-page'

const queryClient = new QueryClient()
const bookingRepository = createDefaultBookingRepository()
const profileRepository = createDefaultProfileRepository()
const serviceRepository = createDefaultServiceRepository()

const router = createBrowserRouter([
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
  {
    path: '/admin',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/bookings',
    element: <BookingListPage />,
  },
  ...routes,
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingRepositoryProvider repository={bookingRepository}>
        <ProfileRepositoryProvider repository={profileRepository}>
          <ServiceRepositoryProvider repository={serviceRepository}>
            <RouterProvider router={router} />
          </ServiceRepositoryProvider>
        </ProfileRepositoryProvider>
      </BookingRepositoryProvider>
    </QueryClientProvider>
  )
}

export default App
