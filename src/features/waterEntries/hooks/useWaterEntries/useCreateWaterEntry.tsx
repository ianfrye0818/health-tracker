import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { createWaterEntry } from "@/server/functions/waterEntries/createWaterEntry.fn";
import { CreateWaterEntryInput } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WATER_ENTRIES_QUERY_KEY } from "./shared";
import { useAuth } from "@/hooks/useAuth";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";

export const useCreateWaterEntry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: CreateWaterEntryInput) => createWaterEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WATER_ENTRIES_QUERY_KEY], Actions.create({
      id: Date.now(),
      ...payload,
      user: {
        id: user?.id || '',
        name: user?.name || ''
      }
    })),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WATER_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Water Entry Created Successfully')
    }
  })
}
