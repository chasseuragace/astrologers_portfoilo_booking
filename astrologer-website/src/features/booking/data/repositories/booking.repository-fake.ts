/// In-memory fake repository for Booking.
import type { Either } from '../../../../core/usecase/usecase';
import { left, right } from '../../../../core/usecase/usecase';
import { NotFoundFailure, type Failure } from '../../../../core/errors/failures';
import type { BookingEntity } from '../../domain/entities/booking.entity';
import type { BookingRepository } from '../../domain/repositories/booking.repository';
import { toEntity, dummyBookingList } from '../models/booking.model';

export class BookingRepositoryFake implements BookingRepository {
  private data: BookingEntity[] = [];

  constructor(seedData: BookingEntity[] = []) {
    this.data = seedData;
  }

  static seeded(count: number = 5): BookingRepositoryFake {
    const models = dummyBookingList(count);
    return new BookingRepositoryFake(models.map(toEntity));
  }

  async getAll(): Promise<Either<Failure, BookingEntity[]>> {
    return right([...this.data]);
  }

  async getById(id: string): Promise<Either<Failure, BookingEntity>> {
    const entity = this.data.find((e) => e.id === id);
    if (!entity) {
      return left(new NotFoundFailure(`Booking with id ${id} not found`));
    }
    return right(entity);
  }

  async add(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    const newEntity = { ...entity, createdAt: new Date(), updatedAt: new Date() };
    this.data.push(newEntity);
    return right(newEntity);
  }

  async update(entity: BookingEntity): Promise<Either<Failure, BookingEntity>> {
    const index = this.data.findIndex((e) => e.id === entity.id);
    if (index === -1) {
      return left(new NotFoundFailure(`Booking with id ${entity.id} not found`));
    }
    const updated = { ...entity, updatedAt: new Date() };
    this.data[index] = updated;
    return right(updated);
  }

  async delete(id: string): Promise<Either<Failure, void>> {
    const index = this.data.findIndex((e) => e.id === id);
    if (index === -1) {
      return left(new NotFoundFailure(`Booking with id ${id} not found`));
    }
    this.data.splice(index, 1);
    return right(undefined);
  }

}
