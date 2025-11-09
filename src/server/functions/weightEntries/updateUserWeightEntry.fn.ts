import { prisma } from "@/db";
import { NotFoundException } from "@/Exceptions";
import { MessageResponseDto } from "@/server/dtos";
import { authMiddleware } from "@/server/middleware";
import { updateWeightEntryInputSchema } from "@/server/schemas";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const updateUserWeightEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateWeightEntryInputSchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const weightEntry = await prisma.weightEntry.findFirst({
        where: {
          id: data.id,
          userId: user.id,
        },
      });

      if (!weightEntry)
        throw new NotFoundException(
          `Weight entry with id ${data.id} not found`
        );

      await prisma.weightEntry.update({
        where: { id: weightEntry.id },
        data: {
          weight: data.weight,
          notes: data.notes,
          date: data.date,
        },
      });

      return {
        message: "Weight entry updated successfully",
        data: { id: weightEntry.id },
        statusCode: 200,
        success: true,
      };
    }
  );
