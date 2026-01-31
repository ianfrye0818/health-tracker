import { BloodPressureEntryDto } from "@/lib/dtos";
import { GetBloodPressurEntriesFn } from "@/server/features/bloodPressureEntries";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";

export const useGetUsersBloodPressureEntries = (options?: Partial<UseQueryOptions<BloodPressureEntryDto[]>>) => useQuery({
  queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY],
  queryFn: () => GetBloodPressurEntriesFn(),
  ...options,
})
