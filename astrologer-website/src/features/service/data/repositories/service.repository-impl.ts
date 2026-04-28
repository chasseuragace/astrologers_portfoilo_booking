/// Real repository implementation for Service.
/// Currently throws UnimplementedError — replace with actual API calls.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ServiceEntity } from '../../domain/entities/service.entity';
import type { ServiceRepository } from '../../domain/repositories/service.repository';

export class ServiceRepositoryImpl implements ServiceRepository {
  async getAll(): Promise<Either<Failure, ServiceEntity[]>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async getById(id: string): Promise<Either<Failure, ServiceEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async add(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async update(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async delete(id: string): Promise<Either<Failure, void>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

}
