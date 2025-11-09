import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const removeExerciseEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const exerciseEntry = await prisma.exerciseEntry.findFirst({
        where: {
          id: data.id,
          userId: user.id,
        },
      });

      if (!exerciseEntry)
        throw new NotFoundException(
          `Exercise entry with id ${data.id} not found`
        );

      await prisma.exerciseEntry.delete({
        where: { id: data.id },
      });

      return {
        message: 'Exercise entry removed successfully',
        data: { id: exerciseEntry.id },
        statusCode: 200,
        success: true,
      };
    }
  );
