import { WeightEntryDto } from "@/server/dtos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { WEIGHT_ENTRIES_QUERY_KEY } from "./shared";
import { getUserWeightEntires } from "@/server/functions/weightEntries";

export const useGetUsersWeightEntries = (options?: UseQueryOptions<WeightEntryDto[]>) => useQuery({
  queryKey: [WEIGHT_ENTRIES_QUERY_KEY],
  queryFn: () => getUserWeightEntires(),
  ...options,
})
