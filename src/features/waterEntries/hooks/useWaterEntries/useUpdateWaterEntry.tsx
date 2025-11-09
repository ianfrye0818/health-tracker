import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { UpdateWaterEntryInput } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WATER_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";
import { WaterEntryDto } from "@/server/dtos";
import { updateWaterEntry } from "@/server/functions/waterEntries/updateWaterEntry.fn";

export const useUpdateWaterEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { original: WaterEntryDto, modified: UpdateWaterEntryInput }) => updateWaterEntry({ data: payload.modified }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WATER_ENTRIES_QUERY_KEY], Actions.update({
      ...payload.original,
      ...payload.modified,
    })),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WATER_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Water Entry Updated Successfully')
    }
  })
}
