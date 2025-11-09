

import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { UpdateExerciseEntryInput } from "@/server/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, EXERCISE_ENTRIES_QUERY_KEY } from "./shared"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"
import { updateExerciseEntry } from "@/server/functions/exerciseEntry"
import { ExerciseEntryDto } from "@/server/dtos"

export const useUpdateExerciseEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { original: ExerciseEntryDto, modified: UpdateExerciseEntryInput }) => updateExerciseEntry({ data: payload.modified }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [EXERCISE_ENTRIES_QUERY_KEY], Actions.update({
      ...payload.original,
      ...payload.modified
    })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Updated Created Successfully!')
    }
  })
}
