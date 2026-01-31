import { appToast } from "@/components/AppToast";
import { UpdateBloodPressureInput } from "@/lib/schemas";
import { UpdateBloodPressureEntryFn } from "@/server/features/bloodPressureEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";

export const useUpdateBloodPressureEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBloodPressureInput) => UpdateBloodPressureEntryFn({ data: payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Blood Pressure Entry Updated Successfully')
    }
  })
}
