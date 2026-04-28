/// Real repository implementation for Service.
/// Currently throws UnimplementedError — replace with actual API calls.
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ServiceEntity } from '../../domain/entities/service.entity';
import type { ServiceRepository } from '../../domain/repositories/service.repository';

export class ServiceRepositoryImpl implements ServiceRepository {
  async getAll(): Promise<Either<Failure, ServiceEntity[]>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async getById(_id: string): Promise<Either<Failure, ServiceEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async add(_entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async update(_entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async delete(_id: string): Promise<Either<Failure, void>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

}
