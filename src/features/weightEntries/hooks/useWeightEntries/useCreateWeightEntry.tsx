  import { appToast } from "@/components/AppToast";
import { CreateWeightEntryInput } from "@/lib/schemas";
import { CreateWeightEntryFn } from "@/server/features/weightEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WEIGHT_ENTRIES_QUERY_KEY } from "./shared";

export const useCreateWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWeightEntryInput)  => CreateWeightEntryFn({ data: payload }),
    onSuccess: async  () => {
      await queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Weight Entry Created Successfully')
    }
  })
}
