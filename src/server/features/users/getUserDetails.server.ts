import { prisma } from '@/db';
import { NotFoundException } from '@/exceptions';
import { AppUser, toUserDto } from '@/lib/dtos';

export const getUserDetails = async (userId: string): Promise<AppUser> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new NotFoundException('User not found');

  return toUserDto(user);
};
