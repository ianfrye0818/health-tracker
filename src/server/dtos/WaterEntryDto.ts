import { Prisma } from '@prisma/generated';
import { MeasureUnit } from '../enums';
type DbWaterEntry = Prisma.WaterEntryGetPayload<{
  include: { user: true };
}>;

export interface WaterEntryDto {
  id: number;
  amount: number;
  unit: MeasureUnit;
  date: Date;
  user: {
    id: string;
    name: string;
  };
}

export function toWaterEntryDto(waterEntry: DbWaterEntry): WaterEntryDto {
  return {
    id: waterEntry.id,
    amount: waterEntry.amount,
    unit: waterEntry.unit as MeasureUnit,
    date: waterEntry.date,
    user: {
      id: waterEntry.user.id,
      name: waterEntry.user.name,
    },
  };
}
