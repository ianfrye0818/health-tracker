import { appToast } from "@/components/AppToast";
import { UpdateWaterEntryInput } from "@/lib/schemas";
import { UpdateWaterEntryFn } from "@/server/features/waterEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATER_ENTRIES_QUERY_KEY } from "./shared";


export const useUpdateWaterEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateWaterEntryInput) => UpdateWaterEntryFn({ data: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WATER_ENTRIES_QUERY_KEY],
        type: 'all',
        exact: false,
      });
      appToast.success('Water Entry Updated Successfully');
    },
  });
};
