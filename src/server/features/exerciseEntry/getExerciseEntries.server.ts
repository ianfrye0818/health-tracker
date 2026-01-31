import { prisma } from '@/db';
import { ExcerciseEntryInclude, ExerciseEntryDto, toExerciseEntryDto } from '@/lib/dtos';
import { SessionUser } from '@/lib/session';

export const getExerciseEntries = async (
  user: SessionUser
): Promise<ExerciseEntryDto[]> => {
  const exerciseEntries = await prisma.exerciseEntry.findMany({
    where: { userId: user.id },
    include: ExcerciseEntryInclude
  });
  return exerciseEntries.map(toExerciseEntryDto);
};
