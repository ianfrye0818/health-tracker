import { prisma } from "@/db";
import { MessageResponseDto } from "@/server/dtos";
import { authMiddleware } from "@/server/middleware";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const removeWeightEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }): Promise<MessageResponseDto<number>> => {
    const { user } = context;

    await prisma.weightEntry.delete({
      where: {
        id: data.id,
        userId: user.id,
      },
    });

    return {
      message: "Weight entry removed successfully",
      data: data.id,
      statusCode: 200,
      success: true,
    };
  });
