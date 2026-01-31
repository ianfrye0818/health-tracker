import { prisma } from '@/db';
import { ExerciseDto, ExerciseInclude, toExerciseDto } from '@/lib/dtos';
import { SessionUser } from '@/lib/session';

export const getExercises = async (
  user: SessionUser
): Promise<ExerciseDto[]> => {
  const exercises = await prisma.exercise.findMany({
    where: { userId: user.id },
    include: ExerciseInclude,
    orderBy: {
      name: 'asc',
    },
  });

  return exercises.map(toExerciseDto);
};
