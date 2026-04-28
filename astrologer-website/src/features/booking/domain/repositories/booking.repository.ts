/// Repository contract for Booking.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { BookingEntity } from '../entities/booking.entity';

export type BookingRepository = {
  getAll(): Promise<Either<Failure, BookingEntity[]>>;
  getById(id: string): Promise<Either<Failure, BookingEntity>>;
  add(entity: BookingEntity): Promise<Either<Failure, BookingEntity>>;
  update(entity: BookingEntity): Promise<Either<Failure, BookingEntity>>;
  delete(id: string): Promise<Either<Failure, void>>;
}
