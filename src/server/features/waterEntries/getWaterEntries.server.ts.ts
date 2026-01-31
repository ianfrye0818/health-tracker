import { prisma } from '@/db';
import { toWaterEntryDto, WaterEntryDto } from '@/lib/dtos';
import { SessionUser } from '@/lib/session';

export const getWaterEntries = async (
  user: SessionUser
): Promise<WaterEntryDto[]> => {
  const waterEntries = await prisma.waterEntry.findMany({
    where: { userId: user.id },
    include: { user: true },
  });

  return waterEntries.map(toWaterEntryDto);
};
