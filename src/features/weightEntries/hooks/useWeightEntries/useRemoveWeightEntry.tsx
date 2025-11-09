import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { removeWeightEntry } from "@/server/functions/weightEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WEIGHT_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";
import { WeightEntryDto } from "@/server/dtos";

export const useRemoveWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WeightEntryDto) => removeWeightEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WEIGHT_ENTRIES_QUERY_KEY], Actions.remove(payload)),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Weight Entry Removed Successfully')
    }
  })
}
