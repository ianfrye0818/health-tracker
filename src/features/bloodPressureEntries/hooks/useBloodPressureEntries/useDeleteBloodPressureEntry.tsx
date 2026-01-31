import { appToast } from "@/components/AppToast";
import { DeleteBloodPressureEntryFn } from "@/server/features/bloodPressureEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";

export const useDeleteBloodPressureEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DeleteBloodPressureEntryFn({ data: { id }}),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Blood Pressure Entry Removed Successfully')
    }
  })
}
