import { appToast } from "@/components/AppToast";
import { UpdateExerciseEntryInput } from "@/lib/schemas";
import { UpdateExerciseEntryFn } from "@/server/features/exerciseEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_ENTRIES_QUERY_KEY } from "./shared";


export const useUpdateExerciseEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateExerciseEntryInput) => UpdateExerciseEntryFn({ data: payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [EXERCISE_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Exercise Entry Updated Successfully!')
    }
  })
}
