import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { SessionUser } from '@/lib/session';

export const deleteWaterEntry = async (
  id: number,
  user: SessionUser
): Promise<void> => {
  const waterEntry = await prisma.waterEntry.findFirst({
    where: { id, userId: user.id },
  });

  if (!waterEntry) throw new NotFoundException('Water entry not found');

  await prisma.waterEntry.delete({
    where: { id, userId: user.id },
  });
};
