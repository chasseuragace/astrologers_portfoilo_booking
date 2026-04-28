/// TanStack Query hooks for Service.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ServiceEntity } from '../../domain/entities/service.entity';
import type { ServiceRepository } from '../../domain/repositories/service.repository';
import { GetAllServicesUseCase, GetServiceByIdUseCase, AddServiceUseCase, UpdateServiceUseCase, DeleteServiceUseCase } from '../../domain/usecases/service.usecases';
import { useServiceRepositoryContext } from '../service.repository-context';

const QUERY_KEY = ['service'];

export function useServiceRepository(): ServiceRepository {
  return useServiceRepositoryContext();
}

export function useServiceList(): UseQueryResult<ServiceEntity[], Error> {
  const repository = useServiceRepository();
  const useCase = new GetAllServicesUseCase(repository);
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => useCase.execute().then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
  });
}

export function useServiceById(id: string): UseQueryResult<ServiceEntity, Error> {
  const repository = useServiceRepository();
  const useCase = new GetServiceByIdUseCase(repository);
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => useCase.execute(id).then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
    enabled: !!id,
  });
}

export function useServiceMutations() {
  const queryClient = useQueryClient();
  const repository = useServiceRepository();

  const addMutation = useMutation({
    mutationFn: (entity: ServiceEntity) => {
      const useCase = new AddServiceUseCase(repository);
      return useCase.execute(entity).then((result) => {
        if ('left' in result) throw new Error(result.left.message);
        return result.right;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (entity: ServiceEntity) => {
      const useCase = new UpdateServiceUseCase(repository);
      return useCase.execute(entity).then((result) => {
        if ('left' in result) throw new Error(result.left.message);
        return result.right;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const useCase = new DeleteServiceUseCase(repository);
      return useCase.execute(id).then((result) => {
        if ('left' in result) throw new Error(result.left.message);
        return result.right;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    add: addMutation,
    update: updateMutation,
    delete: deleteMutation,
  };
}
