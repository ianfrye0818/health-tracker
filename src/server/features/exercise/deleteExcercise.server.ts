import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { SessionUser } from '@/lib/session';

export const deleteExercise = async (
  id: number,
  user: SessionUser
): Promise<void> => {
  const exercise = await prisma.exercise.findUnique({
    where: { id, userId: user.id },
  });

  if (!exercise) throw new NotFoundException('Exercise not found');

  await prisma.exercise.delete({
    where: { id, userId: user.id },
  });
};
