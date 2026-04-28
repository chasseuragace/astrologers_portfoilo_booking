/// TanStack Query hooks for Booking.
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { BookingEntity } from '../../domain/entities/booking.entity';
import type { BookingRepository } from '../../domain/repositories/booking.repository';
import { GetAllBookingsUseCase, GetBookingByIdUseCase, AddBookingUseCase, UpdateBookingUseCase, DeleteBookingUseCase } from '../../domain/usecases/booking.usecases';
import { useBookingRepositoryContext } from '../booking.repository-context';

const QUERY_KEY = ['booking'];

export function useBookingRepository(): BookingRepository {
  return useBookingRepositoryContext();
}

export function useBookingList(): UseQueryResult<BookingEntity[], Error> {
  const repository = useBookingRepository();
  const useCase = new GetAllBookingsUseCase(repository);
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => useCase.execute().then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
  });
}

export function useBookingById(id: string): UseQueryResult<BookingEntity, Error> {
  const repository = useBookingRepository();
  const useCase = new GetBookingByIdUseCase(repository);
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => useCase.execute(id).then((result) => {
      if ('left' in result) throw new Error(result.left.message);
      return result.right;
    }),
    enabled: !!id,
  });
}

export function useBookingMutations() {
  const queryClient = useQueryClient();
  const repository = useBookingRepository();

  const addMutation = useMutation({
    mutationFn: (entity: BookingEntity) => {
      const useCase = new AddBookingUseCase(repository);
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
    mutationFn: (entity: BookingEntity) => {
      const useCase = new UpdateBookingUseCase(repository);
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
      const useCase = new DeleteBookingUseCase(repository);
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
