import { prisma } from '@/db';
import { MessageResponseDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createBloodPressureInputSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const createBloodPressureEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createBloodPressureInputSchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const bpEntry = await prisma.bloodPressureEntry.create({
        data: {
          userId: user.id,
          systolic: data.systolic,
          diastolic: data.diastolic,
          pulse: data.pulse,
          oxygenSaturation: data.oxygenSaturation,
          position: data.position,
          notes: data.notes,
          date: data.date,
        },
      });

      return {
        message: 'Blood pressure entry created successfully',
        data: { id: bpEntry.id },
        statusCode: 201,
        success: true,
      };
    }
  );
