import { prisma } from '@/db';
import { CreateBloodPressureInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const createBloodPressureEntry = async (
  data: CreateBloodPressureInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const bpEntry = await prisma.bloodPressureEntry.create({
    data: {
      userId: user.id,
      systolic: data.systolic,
      diastolic: data.diastolic,
      pulse: data.pulse,
      oxygenSaturation: data.oxygenSaturation,
      position: data.position,
      notes: data.notes,
      date: data.date,
    },
  });

  return { id: bpEntry.id };
};
