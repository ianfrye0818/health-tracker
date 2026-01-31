import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { UpdateWaterEntryInput } from '@/lib/schemas';
import { SessionUser } from '@/lib/session';

export const updateWaterEntry = async (
  data: UpdateWaterEntryInput,
  user: SessionUser
) => {
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
    id: waterEntry.id,
  };
};
