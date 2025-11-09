import { prisma } from '@/db';
import { toWaterEntryDto, WaterEntryDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';

export const getUserWaterEntries = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<WaterEntryDto[]> => {
    const { user } = context;

    const waterEntries = await prisma.waterEntry.findMany({
      where: { userId: user.id },
      include: { user: true },
    });

    return waterEntries.map(toWaterEntryDto);
  });
