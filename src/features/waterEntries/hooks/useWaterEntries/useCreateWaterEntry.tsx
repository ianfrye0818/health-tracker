import { appToast } from "@/components/AppToast";
import { CreateWaterEntryInput } from "@/lib/schemas";
import { CreateWaterEntryFn } from "@/server/features/waterEntries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WATER_ENTRIES_QUERY_KEY } from "./shared";

export const useCreateWaterEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWaterEntryInput) => CreateWaterEntryFn({ data: payload }),
    onSuccess: async  () => {
      await queryClient.invalidateQueries({
        queryKey: [WATER_ENTRIES_QUERY_KEY],
        type: 'all',
        exact: false,
      });
      appToast.success('Water Entry Created Successfully');
    },
  });
};
