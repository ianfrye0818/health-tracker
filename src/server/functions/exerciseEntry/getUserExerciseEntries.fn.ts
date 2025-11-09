import { prisma } from '@/db';
import { ExerciseEntryDto, toExerciseEntryDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';

export const getUserExerciseEntries = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<ExerciseEntryDto[]> => {
    const { user } = context;

    const exerciseEntries = await prisma.exerciseEntry.findMany({
      where: { userId: user.id },
      include: {
        user: true,
        exercise: true,
      },
    });

    return exerciseEntries.map(toExerciseEntryDto);
  });
