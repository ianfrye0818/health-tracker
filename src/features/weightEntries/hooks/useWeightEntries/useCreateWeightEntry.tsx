import { useAuth } from "@/hooks/useAuth";
import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic";
import { createWeightEntry } from "@/server/functions/weightEntries";
import { CreateWeightEntryInput } from "@/server/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, WEIGHT_ENTRIES_QUERY_KEY } from "./shared";
import { appToast } from "@/components/AppToast";
import { ErrorFormatter } from "@/lib/ErrorFormatter";

export const useCreateWeightEntry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: CreateWeightEntryInput) => createWeightEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [WEIGHT_ENTRIES_QUERY_KEY], Actions.create({
      id: Date.now(),
      user: {
        id: user?.id || '',
        name: user?.name || '',
      },
      ...payload,
    })),
    onError: (error, _, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error))
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WEIGHT_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Weight Entry Created Successfully')
    }
  })
}
