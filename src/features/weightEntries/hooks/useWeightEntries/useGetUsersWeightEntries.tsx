import { WeightEntryDto } from "@/lib/dtos";
import { GetWeightEntriesFn } from "@/server/features/weightEntries";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { WEIGHT_ENTRIES_QUERY_KEY } from "./shared";

export const useGetUsersWeightEntries = (options?: Partial<UseQueryOptions<WeightEntryDto[]>>) => useQuery({
  queryKey: [WEIGHT_ENTRIES_QUERY_KEY],
  queryFn: () => GetWeightEntriesFn(),
  ...options,
})
