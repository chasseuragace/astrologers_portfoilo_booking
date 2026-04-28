/// Repository context for Booking dependency injection.
/// Allows switching between fake and real implementations.
import { createRepositoryContext } from '../../../core/context/repository-context';
import type { BookingRepository } from '../domain/repositories/booking.repository';
import { BookingRepositoryImpl } from '../data/repositories/booking.repository-impl';

export const {
  Provider: BookingRepositoryProvider,
  useRepository: useBookingRepositoryContext,
} = createRepositoryContext<BookingRepository>();

/// Default repository implementation.
export function createDefaultBookingRepository(): BookingRepository {
  return new BookingRepositoryImpl();
}
