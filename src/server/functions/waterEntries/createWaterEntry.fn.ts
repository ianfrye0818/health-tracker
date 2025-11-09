import { prisma } from '@/db';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createWaterEntryInputSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const createWaterEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createWaterEntryInputSchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const waterEntry = await prisma.waterEntry.create({
        data: {
          userId: user.id,
          amount: data.amount,
          unit: data.unit,
          date: data.date,
        },
      });

      return {
        message: 'Water entry created successfully',
        data: { id: waterEntry.id },
        statusCode: 201,
        success: true,
      };
    }
  );
