  import { appToast } from "@/components/AppToast";
import { DeleteExerciseFn } from "@/server/features/exercise";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_QUERY_KEY } from "./shared";


export const useRemoveExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => DeleteExerciseFn({ data: { id }}),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [EXERCISE_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Exercise Deleted Successfully!')
    }
  })
}
