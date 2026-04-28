/// Use cases for Service.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ServiceEntity } from '../entities/service.entity';
import type { ServiceRepository } from '../repositories/service.repository';

export class GetAllServicesUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Either<Failure, ServiceEntity[]>> {
    return this.repository.getAll();
  }
}

export class GetServiceByIdUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, ServiceEntity>> {
    return this.repository.getById(id);
  }
}

export class AddServiceUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    return this.repository.add(entity);
  }
}

export class UpdateServiceUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    return this.repository.update(entity);
  }
}

export class DeleteServiceUseCase {
  private repository: ServiceRepository;

  constructor(repository: ServiceRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, void>> {
    return this.repository.delete(id);
  }
}
