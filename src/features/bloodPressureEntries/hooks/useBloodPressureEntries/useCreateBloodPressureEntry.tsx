import { handleOptimisticUpdateGuarded, hanldeOptimisticError } from "@/lib/handleOptimistic"
import { createBloodPressureEntry } from "@/server/functions/bloodPressureEntries"
import { CreateBloodPressureInput } from "@/server/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Actions, BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared"
import { useAuth } from "@/hooks/useAuth"
import { appToast } from "@/components/AppToast"
import { ErrorFormatter } from "@/lib/ErrorFormatter"

export const useCreateBloodPressureEntry = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: CreateBloodPressureInput) => createBloodPressureEntry({ data: payload }),
    onMutate: (payload) => handleOptimisticUpdateGuarded(queryClient, [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], Actions.create({
      id: Date.now(),
      user: {
        id: user?.id || '',
        name: user?.name || '',
      },
      ...payload,
    })),
    onError: (error, __, ctx) => {
      hanldeOptimisticError(queryClient, ctx?.prevData);
      appToast.error(ErrorFormatter.format(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'active', exact: false })
      appToast.success('Bloodpressure Entry Created Successfully!')
    }
  })
}
