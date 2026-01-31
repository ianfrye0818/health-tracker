import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { UpdateBloodPressureInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const updateBloodPressureEntry = async (
  data: UpdateBloodPressureInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const bpEntry = await prisma.bloodPressureEntry.findFirst({
    where: {
      id: data.id,
      userId: user.id,
    },
  });

  if (!bpEntry) throw new NotFoundException('Blood pressure entry not found');

  await prisma.bloodPressureEntry.update({
    where: { id: data.id },
    data: {
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
