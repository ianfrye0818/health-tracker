import { appToast } from "@/components/AppToast";
import { DeleteExerciseEntryFn } from "@/server/features/exerciseEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_ENTRIES_QUERY_KEY } from "./shared";


export const useDeleteExerciseEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => DeleteExerciseEntryFn({ data: { id }}),
    onSuccess: async  () => {
      await queryClient.invalidateQueries({ queryKey: [EXERCISE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Exercise Entry Removed Successfully!')
    }
  })
}
