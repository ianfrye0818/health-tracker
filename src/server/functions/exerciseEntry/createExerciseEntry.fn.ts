import { prisma } from '@/db';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createExerciseEntrySchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const createExerciseEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createExerciseEntrySchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

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

      return {
        message: 'Exercise entry created successfully',
        data: { id: exerciseEntry.id },
        statusCode: 201,
        success: true,
      };
    }
  );
