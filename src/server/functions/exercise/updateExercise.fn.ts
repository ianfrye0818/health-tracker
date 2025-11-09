import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { updateExerciseInputSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const updateExercise = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateExerciseInputSchema))
  .handler(async ({ data }): Promise<MessageResponseDto<{ id: number }>> => {
    const exercise = await prisma.exercise.findFirst({
      where: { id: data.id },
    });
    if (!exercise) throw new NotFoundException('Exercise not found');

    await prisma.exercise.update({
      where: { id: data.id },
      data: {
        name: data.name,
        caloriesPerMin: data.caloriesPerMin,
        exerciseType: data.exerciseType,
      },
    });

    return {
      message: 'Exercise updated successfully',
      data: { id: exercise.id },
      statusCode: 200,
      success: true,
    };
  });
