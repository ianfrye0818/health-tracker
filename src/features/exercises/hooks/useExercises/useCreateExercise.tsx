  import { appToast } from "@/components/AppToast";
import { CreateExerciseInput } from "@/lib/schemas";
import { CreateExerciseFn } from "@/server/features/exercise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_QUERY_KEY } from "./shared";

export const useCreateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateExerciseInput) => CreateExerciseFn({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Exercise Created Successfully!')
    }
  })
}
