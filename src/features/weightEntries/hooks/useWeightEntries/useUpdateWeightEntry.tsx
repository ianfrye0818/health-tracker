import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { updateWeightEntry } from "@/server/functions/weightEntries";
import { UpdateWeightEntryInput } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WEIGHT_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";
import { WeightEntryDto } from "@/server/dtos";

export const useUpdateWeightEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { original: WeightEntryDto, modified: UpdateWeightEntryInput }) => updateWeightEntry({ data: payload.modified }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WEIGHT_ENTRIES_QUERY_KEY], Actions.update({ ...payload.original, ...payload.modified })),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Weight Entry Updated Successfully')
    }
  })
}
