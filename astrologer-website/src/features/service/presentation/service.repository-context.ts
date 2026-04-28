/// Repository context for Service dependency injection.
/// Allows switching between fake and real implementations.
import { createRepositoryContext } from '../../../core/context/repository-context';
import type { ServiceRepository } from '../domain/repositories/service.repository';
import { ServiceRepositoryFake } from '../data/repositories/service.repository-fake';

export const {
  Provider: ServiceRepositoryProvider,
  useRepository: useServiceRepositoryContext,
} = createRepositoryContext<ServiceRepository>();

/// Default repository implementation for development.
/// Override this in production or tests by providing a different implementation
/// to the ServiceRepositoryProvider.
export function createDefaultServiceRepository(): ServiceRepository {
  return ServiceRepositoryFake.seeded();
}
