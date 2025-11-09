import { prisma } from '@/db';
import { toExerciseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';

export const getExercises = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async () => {
    const exercises = await prisma.exercise.findMany();
    return exercises.map(toExerciseDto);
  });
