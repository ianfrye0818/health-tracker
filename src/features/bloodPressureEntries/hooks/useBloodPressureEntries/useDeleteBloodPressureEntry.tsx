import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { BloodPressureEntryDto } from "@/server/dtos";
import { removeBloodPressureEntry } from "@/server/functions/bloodPressureEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Actions, BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";

export const useDeleteBloodPressureEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BloodPressureEntryDto) => removeBloodPressureEntry({ data: payload }),
    onMutate: (payload) =>
      handleOptimisticUpdateGuarded(queryClient, [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], Actions.remove(payload)),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Bloodpressure Entry Removed Successfully')
    }
  })
}
