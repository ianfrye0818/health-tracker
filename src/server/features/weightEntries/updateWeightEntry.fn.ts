import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { UpdateWeightEntryInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const updateWeightEntry = async (data: UpdateWeightEntryInput, user: SessionUser): Promise<{ id: number }> => {
  const weightEntry = await prisma.weightEntry.findFirst({
    where: { id: data.id, userId: user.id },
  });

  if (!weightEntry) throw new NotFoundException(`Weight entry with id ${data.id} not found`);

      await prisma.weightEntry.update({
        where: { id: weightEntry.id },
        data: {
          weight: data.weight,
          notes: data.notes,
          date: data.date,
        },
      });

  return { id: weightEntry.id };
};
