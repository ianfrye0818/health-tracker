import { prisma } from "@/db";
import { toUserDto, UserDto } from "@/server/dtos";
import { createServerFn } from "@tanstack/react-start";

export const getUsers = createServerFn({ method: "GET" }).handler(
  async (): Promise<UserDto[]> => {
    const users = await prisma.user.findMany();

    return users.map(toUserDto);
  }
);
