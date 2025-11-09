import { prisma } from '@/db';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createExerciseSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const createExercise = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createExerciseSchema))
  .handler(async ({ data }): Promise<MessageResponseDto<{ id: number }>> => {
    const exercise = await prisma.exercise.create({
      data: {
        name: data.name,
        caloriesPerMin: data.caloriesPerMin,
        exerciseType: data.exerciseType,
      },
    });

    return {
      message: 'Exercise created successfully',
      data: { id: exercise.id },
      statusCode: 201,
      success: true,
    };
  });
