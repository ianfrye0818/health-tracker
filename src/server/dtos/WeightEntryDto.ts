import { Prisma } from '@prisma/generated';

export type DbWeightEntry = Prisma.WeightEntryGetPayload<{
  include: {
    user: true;
  };
}>;

export interface WeightEntryDto {
  id: number;
  weight: number;
  notes: string | null;
  date: Date;
  user: {
    id: string;
    name: string;
  };
}

export function toWeightEntryDto(weightEntry: DbWeightEntry): WeightEntryDto {
  return {
    id: weightEntry.id,
    weight: weightEntry.weight,
    notes: weightEntry.notes,
    date: weightEntry.date,
    user: {
      id: weightEntry.user.id,
      name: weightEntry.user.name,
    },
  };
}
