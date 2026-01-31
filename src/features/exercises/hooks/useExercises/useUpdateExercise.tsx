import { appToast } from "@/components/AppToast";
import { UpdateExerciseInput } from "@/lib/schemas";
import { UpdateExerciseFn } from "@/server/features/exercise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_QUERY_KEY } from "./shared";

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateExerciseInput) => UpdateExerciseFn({ data: payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [EXERCISE_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Exercise Updated Successfully!')
    }
  })
}
