import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { updateExerciseEntrySchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const updateExerciseEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateExerciseEntrySchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const exerciseEntry = await prisma.exerciseEntry.findFirst({
        where: {
          userId: user.id,
          id: data.id,
        },
      });

      if (!exerciseEntry)
        throw new NotFoundException(
          `Exercise entry with id ${data.id} not found`
        );

      await prisma.exerciseEntry.update({
        where: { id: data.id },
        data: {
          duration: data.duration,
          caloriesBurned: data.caloriesBurned,
          intensity: data.intensity,
          dateTime: data.dateTime,
          exerciseId: data.exerciseId,
          notes: data.notes,
        },
      });

      return {
        message: 'Exercise entry updated successfully',
        data: { id: exerciseEntry.id },
        statusCode: 200,
        success: true,
      };
    }
  );
