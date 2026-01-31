import { appToast } from "@/components/AppToast";
import { DeleteWaterEntryFn } from "@/server/features/waterEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATER_ENTRIES_QUERY_KEY } from "./shared";


export const useRemoveWaterEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DeleteWaterEntryFn({ data: { id }}),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [WATER_ENTRIES_QUERY_KEY],
        type: 'all',
        exact: false,
      });
      appToast.success('Water Entry Deleted Successfully');
    },
  });
};
