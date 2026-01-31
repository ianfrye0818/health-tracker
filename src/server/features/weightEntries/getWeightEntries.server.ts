import { prisma } from '@/db';
import { toWeightEntryDto, WeightEntryDto } from '@/lib/dtos';
import { SessionUser } from '@/lib/session';

export const getWeightEntires = async (user: SessionUser): Promise<WeightEntryDto[]> => {
  
    const weightEntries = await prisma.weightEntry.findMany({
      where: { userId: user.id },
      include: { user: true },
    });

    return weightEntries.map(toWeightEntryDto);
};
