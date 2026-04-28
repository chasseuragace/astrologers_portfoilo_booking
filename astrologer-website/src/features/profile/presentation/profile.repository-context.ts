/// Repository context for Profile dependency injection.
/// Allows switching between fake and real implementations.
import { createRepositoryContext } from '../../../core/context/repository-context';
import type { ProfileRepository } from '../domain/repositories/profile.repository';
import { ProfileRepositoryFake } from '../data/repositories/profile.repository-fake';

export const {
  Provider: ProfileRepositoryProvider,
  useRepository: useProfileRepositoryContext,
} = createRepositoryContext<ProfileRepository>();

/// Default repository implementation for development.
/// Override this in production or tests by providing a different implementation
/// to the ProfileRepositoryProvider.
export function createDefaultProfileRepository(): ProfileRepository {
  return ProfileRepositoryFake.seeded();
}
