import { Prisma } from '@prisma/generated';
import { ObjectRef } from './ObjectRef';

export const WeightEntryInclude = {
  user: true
}

export type DbWeightEntry = Prisma.WeightEntryGetPayload<{
  include: typeof WeightEntryInclude;
}>;

export interface WeightEntryDto {
  id: number;
  weight: number;
  notes: string | null;
  date: Date;
  user: ObjectRef;
}

export const toWeightEntryDto = (weightEntry: DbWeightEntry): WeightEntryDto => ({
  id: weightEntry.id,
  weight: weightEntry.weight,
  notes: weightEntry.notes,
  date: weightEntry.date,
  user: {
    key: weightEntry.user.id,
    value: weightEntry.user.name,
  },
});

