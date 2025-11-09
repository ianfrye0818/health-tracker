import { ActionFactory } from "@/lib/handleOptimistic";
import { WeightEntryDto } from "@/server/dtos";

export const WEIGHT_ENTRIES_QUERY_KEY = 'weightEntries';
export const Actions = ActionFactory<WeightEntryDto, 'id'>('id');
