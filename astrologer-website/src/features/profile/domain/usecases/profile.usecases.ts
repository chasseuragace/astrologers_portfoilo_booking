/// Use cases for Profile.
import type { Either } from '../../../../core/usecase/usecase';
import type { Failure } from '../../../../core/errors/failures';
import type { ProfileEntity } from '../entities/profile.entity';
import type { ProfileRepository } from '../repositories/profile.repository';

export class GetAllProfilesUseCase {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Either<Failure, ProfileEntity[]>> {
    return this.repository.getAll();
  }
}

export class GetProfileByIdUseCase {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, ProfileEntity>> {
    return this.repository.getById(id);
  }
}

export class AddProfileUseCase {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async execute(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    return this.repository.add(entity);
  }
}

export class UpdateProfileUseCase {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async execute(entity: ProfileEntity): Promise<Either<Failure, ProfileEntity>> {
    return this.repository.update(entity);
  }
}

export class DeleteProfileUseCase {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<Either<Failure, void>> {
    return this.repository.delete(id);
  }
}
