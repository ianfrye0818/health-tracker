import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { CreateExerciseInput } from "@/server/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, EXERCISE_QUERY_KEY } from "./shared"
import { createExercise } from "@/server/functions/exercise"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"

export const useCreateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateExerciseInput) => createExercise({ data: payload }),
    onMutate: (payload) =>
      handleOptimisticUpdateGuarded(queryClient, [EXERCISE_QUERY_KEY], Actions.create({
        id: Date.now(),
        ...payload,
      })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Created Successfully!')
    }
  })
}
