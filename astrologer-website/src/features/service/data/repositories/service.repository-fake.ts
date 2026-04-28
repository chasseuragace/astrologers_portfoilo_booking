/// In-memory fake repository for Service.
import type { Either } from '../../../../core/usecase/usecase';
import { left, right } from '../../../../core/usecase/usecase';
import { NotFoundFailure, type Failure } from '../../../../core/errors/failures';
import type { ServiceEntity } from '../../domain/entities/service.entity';
import type { ServiceRepository } from '../../domain/repositories/service.repository';
import { toEntity, dummyServiceList } from '../models/service.model';

export class ServiceRepositoryFake implements ServiceRepository {
  private data: ServiceEntity[] = [];

  constructor(seedData: ServiceEntity[] = []) {
    this.data = seedData;
  }

  static seeded(count: number = 5): ServiceRepositoryFake {
    const models = dummyServiceList(count);
    return new ServiceRepositoryFake(models.map(toEntity));
  }

  async getAll(): Promise<Either<Failure, ServiceEntity[]>> {
    return right([...this.data]);
  }

  async getById(id: string): Promise<Either<Failure, ServiceEntity>> {
    const entity = this.data.find((e) => e.id === id);
    if (!entity) {
      return left(new NotFoundFailure(`Service with id ${id} not found`));
    }
    return right(entity);
  }

  async add(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    const newEntity = { ...entity, createdAt: new Date(), updatedAt: new Date() };
    this.data.push(newEntity);
    return right(newEntity);
  }

  async update(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    const index = this.data.findIndex((e) => e.id === entity.id);
    if (index === -1) {
      return left(new NotFoundFailure(`Service with id ${entity.id} not found`));
    }
    const updated = { ...entity, updatedAt: new Date() };
    this.data[index] = updated;
    return right(updated);
  }

  async delete(id: string): Promise<Either<Failure, void>> {
    const index = this.data.findIndex((e) => e.id === id);
    if (index === -1) {
      return left(new NotFoundFailure(`Service with id ${id} not found`));
    }
    this.data.splice(index, 1);
    return right(undefined);
  }

}
