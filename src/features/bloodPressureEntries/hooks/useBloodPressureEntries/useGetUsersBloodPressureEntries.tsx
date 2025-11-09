import { BloodPressureEntryDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BLOOD_PRESSURE_ENTRIES_QUERY_KEY } from "./shared";
import { getUserBloodPressureEntries } from "@/server/functions/bloodPressureEntries";

export const useGetUsersBloodPressureEntries = (options?: UseQueryOptions<BloodPressureEntryDto[]>) => useQuery({
  queryKey: [BLOOD_PRESSURE_ENTRIES_QUERY_KEY],
  queryFn: () => getUserBloodPressureEntries(),
  ...options,
})
