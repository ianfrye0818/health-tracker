import { prisma } from '@/db';
import { toWeightEntryDto, WeightEntryDto } from '@/server/dtos';

import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';

export const getUserWeightEntires = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<WeightEntryDto[]> => {
    const { user } = context;

    const weightEntries = await prisma.weightEntry.findMany({
      where: { userId: user.id },
      include: { user: true },
    });

    return weightEntries.map(toWeightEntryDto);
  });
