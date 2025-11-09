import { ActionFactory } from '@/lib/handleOptimistic';
import { BloodPressureEntryDto } from '@/server/dtos';

export const BLOOD_PRESSURE_ENTRIES_QUERY_KEY = 'bloodPressureEntries';
export const Actions = ActionFactory<BloodPressureEntryDto, 'id'>('id');
