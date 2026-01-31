import { ExerciseDto } from "@/lib/dtos";
import { GetExercisesFn } from "@/server/features/exercise";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { EXERCISE_QUERY_KEY } from "./shared";

export const useGetExercises = (options?: Partial<UseQueryOptions<ExerciseDto[]>>) => useQuery({
  queryFn: () => GetExercisesFn(),
  queryKey: [EXERCISE_QUERY_KEY],
  ...options
})
