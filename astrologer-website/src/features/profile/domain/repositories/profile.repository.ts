/// Repository contract for Profile.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ProfileEntity } from '../entities/profile.entity';

export interface ProfileRepository {
  getAll(): Promise<Either<Failure, ProfileEntity[]>>;
  getById(id: string): Promise<Either<Failure, ProfileEntity>>;
  add(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>>;
  update(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>>;
  delete(id: string): Promise<Either<Failure, void>>;
}
