import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { UpdateExerciseEntryInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const updateExerciseEntry = async (
  data: UpdateExerciseEntryInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const exerciseEntry = await prisma.exerciseEntry.findFirst({
    where: {
      userId: user.id,
      id: data.id,
    },
  });

  if (!exerciseEntry) throw new NotFoundException('Exercise entry not found');

  await prisma.exerciseEntry.update({
    where: { id: data.id, userId: user.id },
    data: {
      duration: data.duration,
      caloriesBurned: data.caloriesBurned,
      intensity: data.intensity,
      dateTime: data.dateTime,
      exerciseId: data.exerciseId,
      notes: data.notes,
    },
  });

  return { id: exerciseEntry.id };
};
