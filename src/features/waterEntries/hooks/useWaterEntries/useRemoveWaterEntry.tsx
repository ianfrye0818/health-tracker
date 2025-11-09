import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WATER_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";
import { WaterEntryDto } from "@/server/dtos";
import { removeWaterEntry } from "@/server/functions/waterEntries/removeWaterEntry.fn";

export const useRemoveWaterEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WaterEntryDto) => removeWaterEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WATER_ENTRIES_QUERY_KEY], Actions.remove(payload)),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WATER_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Water Entry Removed Successfully')
    }
  })
}
