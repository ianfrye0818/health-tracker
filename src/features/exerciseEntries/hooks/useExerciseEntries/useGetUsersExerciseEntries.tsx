import { ExerciseEntryDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { EXERCISE_ENTRIES_QUERY_KEY } from "./shared";
import { getUserExerciseEntries } from "@/server/functions/exerciseEntry";

export const useGetUsersExerciseEntries = (options?: UseQueryOptions<ExerciseEntryDto[]>) => useQuery({
  queryKey: [EXERCISE_ENTRIES_QUERY_KEY],
  queryFn: () => getUserExerciseEntries(),
  ...options
})
