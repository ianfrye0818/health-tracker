import { appToast } from "@/components/AppToast"
import { CreateBloodPressureInput } from "@/lib/schemas"
import { CreateBloodPressureEntryFn } from "@/server/features/bloodPressureEntries"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared"

export const useCreateBloodPressureEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateBloodPressureInput) => CreateBloodPressureEntryFn({ data: payload }),
    onSuccess: async  () => {
      await queryClient.invalidateQueries({ queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY], type: 'all', exact: false })
      appToast.success('Blood Pressure Entry Created Successfully!')
    }
  })
}
