import { Prisma } from '@prisma/generated';
import { ObjectRef } from './ObjectRef';

export const BloodPressureInclude = {
  user: true
}

type DbBloodPressure = Prisma.BloodPressureEntryGetPayload<{
  include: typeof BloodPressureInclude;
}>

export interface BloodPressureEntryDto {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  oxygenSaturation: number | null;
  position: string;
  notes: string | null;
  date: Date;
  user: ObjectRef;
}

export const toBloodPressureEntryDto = (bp: DbBloodPressure): BloodPressureEntryDto => ({
  id: bp.id,
  systolic: bp.systolic,
  diastolic: bp.diastolic,
  pulse: bp.pulse,
  oxygenSaturation: bp.oxygenSaturation,
  position: bp.position,
  notes: bp.notes,
  date: bp.date,
  user: {
    key: bp.user.id,
    value: bp.user.name
  },
});

