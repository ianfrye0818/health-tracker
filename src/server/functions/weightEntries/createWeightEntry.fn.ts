import { prisma } from "@/db";
import { MessageResponseDto } from "@/server/dtos";
import { authMiddleware } from "@/server/middleware";

import { createWeightEntryInputSchema } from "@/server/schemas";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";

export const createWeightEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createWeightEntryInputSchema))
  .handler(
    async ({ data, context }): Promise<MessageResponseDto<{ id: number }>> => {
      const { user } = context;

      const weightEntry = await prisma.weightEntry.create({
        data: {
          userId: user.id,
          weight: data.weight,
          date: data.date,
          notes: data.notes,
        },
      });

      return {
        message: "Weight entry created successfully",
        data: { id: weightEntry.id },
        statusCode: 201,
        success: true,
      };
    }
  );
