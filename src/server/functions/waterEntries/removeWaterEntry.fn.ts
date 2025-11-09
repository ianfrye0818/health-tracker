import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const removeWaterEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const waterEntry = await prisma.waterEntry.findFirst({
        where: { id: data.id, userId: user.id },
      });

      if (!waterEntry) {
        throw new NotFoundException('Water entry not found');
      }

      await prisma.waterEntry.delete({
        where: { id: data.id, userId: user.id },
      });

      return {
        message: 'Water entry removed successfully',
        data: { id: waterEntry.id },
        statusCode: 200,
        success: true,
      };
    }
  );
