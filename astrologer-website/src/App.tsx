import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './core/routing/feature-registry'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookingRepositoryProvider, createDefaultBookingRepository } from './features/booking/presentation/booking.repository-context'
import { ServiceRepositoryProvider, createDefaultServiceRepository } from './features/service/presentation/service.repository-context'

const queryClient = new QueryClient()
const bookingRepository = createDefaultBookingRepository()
const serviceRepository = createDefaultServiceRepository()

const router = createBrowserRouter(routes)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingRepositoryProvider repository={bookingRepository}>
        <ServiceRepositoryProvider repository={serviceRepository}>
          <RouterProvider router={router} />
        </ServiceRepositoryProvider>
      </BookingRepositoryProvider>
    </QueryClientProvider>
  )
}

export default App
