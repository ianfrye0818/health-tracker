import { ExerciseEntryDto } from '@/lib/dtos';
import { GetExerciseEntriesFn } from '@/server/features/exerciseEntry';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { EXERCISE_ENTRIES_QUERY_KEY } from './shared';

export const useGetUsersExerciseEntries = (
  options?: Partial<UseQueryOptions<ExerciseEntryDto[]>>
) =>
  useQuery({
    queryKey: [EXERCISE_ENTRIES_QUERY_KEY],
    queryFn: () => GetExerciseEntriesFn(),
    ...options,
  });
