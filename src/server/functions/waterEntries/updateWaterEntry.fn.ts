import { prisma } from '@/db';
import { NotFoundException } from '@/Exceptions';
import { authMiddleware } from '@/server/middleware';
import { updateWaterEntryInputSchema } from '@/server/schemas';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';

export const updateWaterEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateWaterEntryInputSchema))
  .handler(async ({ data, context }) => {
    const { user } = context;

    const waterEntry = await prisma.waterEntry.findFirst({
      where: { id: data.id, userId: user.id },
    });

    if (!waterEntry)
      throw new NotFoundException(`Water entry with id ${data.id} not found`);

    await prisma.waterEntry.update({
      where: { id: waterEntry.id },
      data: {
        amount: data.amount,
        unit: data.unit,
        date: data.date,
      },
    });

    return {
      message: 'Water entry updated successfully',
      data: { id: waterEntry.id },
      statusCode: 200,
      success: true,
    };
  });
