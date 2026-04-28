/// Use cases for Booking.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { BookingEntity } from '../entities/booking.entity';
import type { BookingRepository } from '../repositories/booking.repository';

export class GetAllBookingsUseCase {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Either<Failure, BookingEntity[]>> {
    return this.repository.getAll();
  }
}

export class GetBookingByIdUseCase {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, BookingEntity>> {
    return this.repository.getById(id);
  }
}

export class AddBookingUseCase {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async execute(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    return this.repository.add(entity);
  }
}

export class UpdateBookingUseCase {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async execute(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    return this.repository.update(entity);
  }
}

export class DeleteBookingUseCase {
  private repository: BookingRepository;

  constructor(repository: BookingRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, void>> {
    return this.repository.delete(id);
  }
}
