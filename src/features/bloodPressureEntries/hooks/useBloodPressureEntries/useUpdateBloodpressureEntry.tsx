import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { BloodPressureEntryDto } from "@/server/dtos";
import { updateBloodPressureEntry } from "@/server/functions/bloodPressureEntries";
import { UpdateBloodPressureInput } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";

export const useUpdateBloodPressureEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { original: BloodPressureEntryDto, modified: UpdateBloodPressureInput }) => updateBloodPressureEntry({ data: payload.modified }),
    onMutate: (payload) =>
      handleOptimisticUpdateGuarded(queryClient, [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], Actions.update({
        ...payload.original,
        ...payload.modified,
      })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Bloodpressure Entry Updated Successfully')
    }
  })
}
