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

  async getById(id: string): Promise<Either<Failure, ProfileEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async add(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async update(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

  async delete(id: string): Promise<Either<Failure, void>> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('UnimplementedError: Real repository not yet implemented');
  }

}
