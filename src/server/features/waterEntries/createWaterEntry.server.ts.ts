import { prisma } from '@/db';
import { CreateWaterEntryInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const createWaterEntry = async (
  data: CreateWaterEntryInput,
  user: SessionUser
): Promise<{ id: number }> => {
  const waterEntry = await prisma.waterEntry.create({
    data: {
      userId: user.id,
      amount: data.amount,
      unit: data.unit,
      date: data.date,
    },
  });

  return { id: waterEntry.id };
};
