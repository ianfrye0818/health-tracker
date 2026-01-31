import { appToast } from "@/components/AppToast";
import { DeleteWeightEntryFn } from "@/server/features/weightEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WEIGHT_ENTRIES_QUERY_KEY } from "./shared";

export const useRemoveWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DeleteWeightEntryFn({ data: { id }}),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Weight Entry Removed Successfully')
    }
  })
}
