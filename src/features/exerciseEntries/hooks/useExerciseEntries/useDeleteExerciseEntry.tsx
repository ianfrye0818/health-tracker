
import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, EXERCISE_ENTRIES_QUERY_KEY } from "./shared"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"
import { removeExerciseEntry } from "@/server/functions/exerciseEntry"
import { ExerciseEntryDto } from "@/server/dtos"

export const useDeleteExerciseEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ExerciseEntryDto) => removeExerciseEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [EXERCISE_ENTRIES_QUERY_KEY], Actions.remove(payload)),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Removed Created Successfully!')
    }
  })
}
