import { prisma } from "@/db";
import { NotFoundException } from "@/exceptions";
import { SessionUser } from "@/lib/session";

export const removeWeightEntry = async (id: number, user: SessionUser): Promise<void> => {
  const weightEntry = await prisma.weightEntry.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!weightEntry) throw new NotFoundException('Weight entry not found');

  await prisma.weightEntry.delete({
    where: { id, userId: user.id },
  });
};
