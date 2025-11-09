import { Prisma } from '@prisma/generated';

type DbBloodPressure = Prisma.BloodPressureEntryGetPayload<{
  include: {
    user: true;
  };
}>;

export interface BloodPressureEntryDto {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  oxygenSaturation: number | null;
  position: string;
  notes: string | null;
  date: Date;
  user: {
    id: string;
    name: string;
  };
}

export function toBloodPressureEntryDto(
  bp: DbBloodPressure
): BloodPressureEntryDto {
  return {
    id: bp.id,
    systolic: bp.systolic,
    diastolic: bp.diastolic,
    pulse: bp.pulse,
    oxygenSaturation: bp.oxygenSaturation,
    position: bp.position,
    notes: bp.notes,
    date: bp.date,
    user: {
      id: bp.user.id,
      name: bp.user.name,
    },
  };
}
