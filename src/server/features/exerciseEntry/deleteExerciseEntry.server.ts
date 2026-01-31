import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { SessionUser } from '@/lib/session';

export const deleteExerciseEntry = async (
  id: number,
  user: SessionUser
): Promise<{ id: number }> => {
  const exerciseEntry = await prisma.exerciseEntry.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!exerciseEntry) throw new NotFoundException('Exercise entry not found');

  await prisma.exerciseEntry.delete({
    where: { id, userId: user.id },
  });

  return { id: exerciseEntry.id };
};
