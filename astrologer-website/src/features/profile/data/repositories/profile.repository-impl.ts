/// Real repository implementation for Profile.
/// Currently throws UnimplementedError — replace with actual API calls.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ProfileEntity } from '../../domain/entities/profile.entity';
import type { ProfileRepository } from '../../domain/repositories/profile.repository';

export class ProfileRepositoryImpl implements ProfileRepository {
  async getAll(): Promise<Either<Failure, ProfileEntity[]>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async getById(_id: string): Promise<Either<Failure, ProfileEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async add(_entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async update(_entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async delete(_id: string): Promise<Either<Failure, void>> {
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

}
