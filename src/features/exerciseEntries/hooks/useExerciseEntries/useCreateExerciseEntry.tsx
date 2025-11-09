
import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { CreateExerciseEntryInput } from "@/server/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, EXERCISE_ENTRIES_QUERY_KEY } from "./shared"
import { useAuth } from "@/hooks/useAuth"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"
import { createExerciseEntry } from "@/server/functions/exerciseEntry"
import { ExerciseType } from "@/server/enums"

export const useCreateExerciseEntry = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: CreateExerciseEntryInput) => createExerciseEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [EXERCISE_ENTRIES_QUERY_KEY], Actions.create({
      id: Date.now(),
      user: {
        id: user?.id || '',
        name: user?.name || ''
      },
      exercise: {
        id: payload.exerciseId || Date.now(),
        name: '',
        caloriesMerMin: 0,
        exerciseType: ExerciseType.OTHER
      },
      ...payload
    })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXERCISE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Entry Created Successfully!')
    }
  })
}
