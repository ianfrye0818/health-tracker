
import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { UpdateExerciseEntryInput } from "@/server/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, EXERCISE_QUERY_KEY } from "./shared"
import { updateExercise } from "@/server/functions/exercise"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"
import { ExerciseDto } from "@/server/dtos"

export const useUpdateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { original: ExerciseDto, modified: UpdateExerciseEntryInput }) => updateExercise({ data: payload.modified }),
    onMutate: (payload) =>
      handleOptimisticUpdateGuarded(queryClient, [EXERCISE_QUERY_KEY], Actions.update({ ...payload.original, ...payload.modified })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Updated Successfully!')
    }
  })
}
