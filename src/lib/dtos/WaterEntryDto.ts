import { Prisma } from '@prisma/generated';
import { MeasureUnit } from '../enums';
import { ObjectRef } from './ObjectRef';

export const WaterEntryInclude = {
  user: true
}

type DbWaterEntry = Prisma.WaterEntryGetPayload<{
  include: typeof WaterEntryInclude;
}>;

export interface WaterEntryDto {
  id: number;
  amount: number;
  unit: MeasureUnit;
  date: Date;
  user: ObjectRef;
}

export const toWaterEntryDto = (waterEntry: DbWaterEntry): WaterEntryDto => ({
  id: waterEntry.id,
  amount: waterEntry.amount,
  unit: waterEntry.unit as MeasureUnit,
  date: waterEntry.date,
  user: {
    key: waterEntry.user.id,
    value: waterEntry.user.name,
  }
});
