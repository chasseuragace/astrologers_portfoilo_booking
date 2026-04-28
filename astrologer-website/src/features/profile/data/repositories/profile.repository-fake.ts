/// In-memory fake repository for Profile.
import type { Either } from '../../../../core/usecase/usecase';
import { left, right } from '../../../../core/usecase/usecase';
import { NotFoundFailure, type Failure } from '../../../../core/errors/failures';
import type { ProfileEntity } from '../../domain/entities/profile.entity';
import type { ProfileRepository } from '../../domain/repositories/profile.repository';
import { toEntity, dummyProfileList } from '../models/profile.model';

export class ProfileRepositoryFake implements ProfileRepository {
  private data: ProfileEntity[] = [];

  constructor(seedData: ProfileEntity[] = []) {
    this.data = seedData;
  }

  static seeded(count: number = 5): ProfileRepositoryFake {
    const models = dummyProfileList(count);
    return new ProfileRepositoryFake(models.map(toEntity));
  }

  async getAll(): Promise<Either<Failure, ProfileEntity[]>> {
    return right([...this.data]);
  }

  async getById(id: string): Promise<Either<Failure, ProfileEntity>> {
    const entity = this.data.find((e) => e.id === id);
    if (!entity) {
      return left(new NotFoundFailure(`Profile with id ${id} not found`));
    }
    return right(entity);
  }

  async add(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    const newEntity = { ...entity, createdAt: new Date(), updatedAt: new Date() };
    this.data.push(newEntity);
    return right(newEntity);
  }

  async update(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    const index = this.data.findIndex((e) => e.id === entity.id);
    if (index === -1) {
      return left(new NotFoundFailure(`Profile with id ${entity.id} not found`));
    }
    const updated = { ...entity, updatedAt: new Date() };
    this.data[index] = updated;
    return right(updated);
  }

  async delete(id: string): Promise<Either<Failure, void>> {
    const index = this.data.findIndex((e) => e.id === id);
    if (index === -1) {
      return left(new NotFoundFailure(`Profile with id ${id} not found`));
    }
    this.data.splice(index, 1);
    return right(undefined);
  }

}
