/// Repository contract for Service.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ServiceEntity } from '../entities/service.entity';

export interface ServiceRepository {
  getAll(): Promise<Either<Failure, ServiceEntity[]>>;
  getById(id: string): Promise<Either<Failure, ServiceEntity>>;
  add(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>>;
  update(entity: ServiceEntity): Promise<Either<Failure, ServiceEntity>>;
  delete(id: string): Promise<Either<Failure, void>>;
}
