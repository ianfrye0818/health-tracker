import { prisma } from '@/db';
import { CreateExerciseEntryInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const createExerciseEntry = async (
  data: CreateExerciseEntryInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const exerciseEntry = await prisma.exerciseEntry.create({
    data: {
      userId: user.id,
      duration: data.duration,
      exerciseId: data.exerciseId,
      dateTime: data.dateTime,
      caloriesBurned: data.caloriesBurned,
      intensity: data.intensity,
      notes: data.notes,
    },
  });

  return { id: exerciseEntry.id };
};
