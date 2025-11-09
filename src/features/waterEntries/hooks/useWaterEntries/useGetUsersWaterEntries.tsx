import { WaterEntryDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { WATER_ENTRIES_QUERY_KEY } from "./shared";
import { getUserWaterEntries } from "@/server/functions/waterEntries/getUsersWaterEntires.fn";

export const useGetUsersWaterEntries = (options?: UseQueryOptions<WaterEntryDto[]>) => useQuery({
  queryKey: [WATER_ENTRIES_QUERY_KEY],
  queryFn: () => getUserWaterEntries(),
  ...options
})
