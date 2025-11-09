import { ExerciseDto } from "@/server/dtos";
import { getExercises } from "@/server/functions/exercise";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { EXERCISE_QUERY_KEY } from "./shared";

export const useGetExercises = (options?: UseQueryOptions<ExerciseDto[]>) => useQuery({
  queryFn: () => getExercises(),
  queryKey: [EXERCISE_QUERY_KEY],
  ...options
})
