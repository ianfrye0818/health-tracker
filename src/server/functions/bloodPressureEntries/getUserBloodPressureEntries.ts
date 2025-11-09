import { prisma } from '@/db';
import { BloodPressureEntryDto, toBloodPressureEntryDto } from '@/server/dtos';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';

export const getUserBloodPressureEntries = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<BloodPressureEntryDto[]> => {
    const { user } = context;

    const entries = await prisma.bloodPressureEntry.findMany({
      where: { userId: user.id },
      include: {
        user: true,
      },
    });

    return entries.map(toBloodPressureEntryDto);
  });
