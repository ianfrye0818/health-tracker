import { prisma } from '@/db';
import { NotFoundException } from '@/Exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const removeExercise = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data }): Promise<MessageResponseDto<{ id: number }>> => {
    const exercise = await prisma.exercise.findUnique({
      where: { id: data.id },
    });

    if (!exercise)
      throw new NotFoundException(`Exercise with id ${data.id} not found`);

    await prisma.exercise.delete({
      where: { id: data.id },
    });

    return {
      message: 'Exercise removed successfully',
      data: { id: exercise.id },
      statusCode: 200,
      success: true,
    };
  });
