import { prisma } from '@/db';
import { CreateExerciseInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const createExercise = async (
  data: CreateExerciseInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const exercise = await prisma.exercise.create({
    data: {
      name: data.name,
      caloriesPerMin: data.caloriesPerMin,
      exerciseType: data.exerciseType,
      userId: user.id,
    },
  });

  return { id: exercise.id };
};
