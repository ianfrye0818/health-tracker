import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { SessionUser } from '@/lib/session';

export const deleteBloodPressureEntry = async (
  id: number,
  user: SessionUser
): Promise<void> => {
  const bpEntry = await prisma.bloodPressureEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!bpEntry) throw new NotFoundException('Blood pressure entry not found');

  await prisma.bloodPressureEntry.delete({
    where: { id, userId: user.id },
  });
};
