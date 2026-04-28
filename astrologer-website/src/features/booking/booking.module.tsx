/* eslint-disable react-refresh/only-export-components */
/// Module exports for Booking.
export type { BookingEntity, BookingStatus } from './domain/entities/booking.entity';
export { BookingEntityClass } from './domain/entities/booking.entity';

export type { BookingRepository } from './domain/repositories/booking.repository';
export { GetAllBookingsUseCase, GetBookingByIdUseCase, AddBookingUseCase, UpdateBookingUseCase, DeleteBookingUseCase } from './domain/usecases/booking.usecases';
export type { BookingModel } from './data/models/booking.model';
export { toEntity, fromModel, dummyBooking, dummyBookingList } from './data/models/booking.model';
export { BookingRepositoryImpl } from './data/repositories/booking.repository-impl';
export { BookingRepositoryFake } from './data/repositories/booking.repository-fake';
export { useBookingRepository, useBookingList, useBookingById, useBookingMutations } from './presentation/hooks/booking.hooks';
export { BookingRepositoryProvider, useBookingRepositoryContext, createDefaultBookingRepository } from './presentation/booking.repository-context';

import { BookingListPage } from './presentation/pages/booking-list-page';
import { BookingDetailsPage } from './presentation/pages/booking-details-page';

export const BookingDescriptor = {
  id: 'booking',
  title: 'Bookings',
  path: '/booking',
};

export const BookingRoutes = [
  {
    path: '/booking',
    element: <BookingListPage />,
  },
  {
    path: '/booking/:id',
    element: <BookingDetailsPage />,
  },
];
