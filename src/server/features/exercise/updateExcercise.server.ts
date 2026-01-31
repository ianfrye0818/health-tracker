import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { UpdateExerciseInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const updateExercise = async (
  data: UpdateExerciseInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: data.id, userId: user.id },
  });

  if (!exercise) throw new NotFoundException('Exercise not found');

  await prisma.exercise.update({
    where: { id: data.id, userId: user.id },
    data: {
      name: data.name,
      caloriesPerMin: data.caloriesPerMin,
      exerciseType: data.exerciseType,
    },
  });

  return { id: exercise.id };
};
