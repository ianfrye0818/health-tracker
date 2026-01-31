import { WaterEntryDto } from '@/lib/dtos';
import { GetWaterEntriesFn } from '@/server/features/waterEntries/WaterEntryController';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { WATER_ENTRIES_QUERY_KEY } from './shared';

export const useGetUsersWaterEntries = (
  options?: Partial<UseQueryOptions<WaterEntryDto[]>>
) =>
  useQuery({
    queryKey: [WATER_ENTRIES_QUERY_KEY],
    queryFn: () => GetWaterEntriesFn(),
    ...options,
  });
