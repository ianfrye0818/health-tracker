import { ActionFactory } from "@/lib/handleOptimistic"
import { WaterEntryDto } from "@/server/dtos";

export const WATER_ENTRIES_QUERY_KEY = 'water-entries'
export const Actions = ActionFactory<WaterEntryDto, 'id'>('id');
