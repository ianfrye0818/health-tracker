import { prisma } from '@/db';
import { AppUser, toUserDto } from '@/lib/dtos';

export const getUsers = async (): Promise<AppUser[]> => {
  const users = await prisma.user.findMany();

  return users.map(toUserDto);
};
