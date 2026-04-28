/// TanStack Query hooks for Profile.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ProfileEntity } from '../../domain/entities/profile.entity';
import type { ProfileRepository } from '../../domain/repositories/profile.repository';
import { GetAllProfilesUseCase, GetProfileByIdUseCase, AddProfileUseCase, UpdateProfileUseCase, DeleteProfileUseCase } from '../../domain/usecases/profile.usecases';
import { useProfileRepositoryContext } from '../profile.repository-context';

const QUERY_KEY = ['profile'];

export function useProfileRepository(): ProfileRepository {
  return useProfileRepositoryContext();
}

export function useProfileList(): UseQueryResult<ProfileEntity[], Error> {
  const repository = useProfileRepository();
  const useCase = new GetAllProfilesUseCase(repository);
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => useCase.execute().then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
  });
}

export function useProfileById(id: string): UseQueryResult<ProfileEntity, Error> {
  const repository = useProfileRepository();
  const useCase = new GetProfileByIdUseCase(repository);
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => useCase.execute(id).then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
    enabled: !!id,
  });
}

export function useProfileMutations() {
  const queryClient = useQueryClient();
  const repository = useProfileRepository();

  const addMutation = useMutation({
    mutationFn: (entity: ProfileEntity) => {
      const useCase = new AddProfileUseCase(repository);
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
    mutationFn: (entity: ProfileEntity) => {
      const useCase = new UpdateProfileUseCase(repository);
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
      const useCase = new DeleteProfileUseCase(repository);
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
