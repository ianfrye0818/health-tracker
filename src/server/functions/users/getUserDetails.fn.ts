import { prisma } from '@/db';
import { toUserDto, UserDto } from '@/server/dtos';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';

export const getUserDetails = createServerFn({ method: 'GET' })
  .inputValidator(zodValidator(z.object({ userId: z.uuid() })))
  .handler(async ({ data }): Promise<UserDto | null> => {
    const { userId } = data;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    return user ? toUserDto(user) : null;
  });
