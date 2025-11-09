import { prisma } from '@/db';
import { NotFoundException } from '@/Exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const removeBloodPressureEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }): Promise<MessageResponseDto<number>> => {
    const { user } = context;

    const bpEntry = await prisma.bloodPressureEntry.findFirst({
      where: { id: data.id, userId: user.id },
    });

    if (!bpEntry) {
      throw new NotFoundException('Blood pressure entry not found');
    }

    await prisma.bloodPressureEntry.delete({
      where: { id: data.id, userId: user.id },
    });

    return {
      message: 'Blood pressure entry removed successfully',
      data: data.id,
      statusCode: 200,
      success: true,
    };
  });
