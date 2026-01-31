import { appToast } from "@/components/AppToast";
import { UpdateWeightEntryInput } from "@/lib/schemas";
import { UpdateWeightEntryFn } from "@/server/features/weightEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WEIGHT_ENTRIES_QUERY_KEY } from "./shared";

export const useUpdateWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateWeightEntryInput) => UpdateWeightEntryFn( { data: payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Weight Entry Updated Successfully')
    }
  })
}
