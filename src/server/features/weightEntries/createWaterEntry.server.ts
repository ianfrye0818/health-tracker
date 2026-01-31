import { prisma } from "@/db";
import { CreateWeightEntryInput } from "@/lib/schemas";
import { SessionUser } from "@/lib/session";

export const createWeightEntry = async (data: CreateWeightEntryInput, user: SessionUser): Promise<{ id: number }> => {
      const weightEntry = await prisma.weightEntry.create({
        data: {
          userId: user.id,
          weight: data.weight,
          date: data.date,
          notes: data.notes,
        },
      });

  return { id: weightEntry.id };
};
