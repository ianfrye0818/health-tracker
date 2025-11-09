import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { updateBloodPressureInputSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const udpateBloodPressureEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateBloodPressureInputSchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const bpEntry = await prisma.bloodPressureEntry.findFirst({
        where: {
          id: data.id,
          userId: user.id,
        },
      });

      if (!bpEntry) {
        throw new NotFoundException('Blood pressure entry not found');
      }

      await prisma.bloodPressureEntry.findFirst({
        where: {
          id: data.id,
          userId: user.id,
        },
      });

      return {
        message: 'Blood pressure entry updated successfully',
        data: { id: bpEntry.id },
        statusCode: 200,
        success: true,
      };
    }
  );
