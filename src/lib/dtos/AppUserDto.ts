import { User } from '@prisma/generated';
import { UserRole } from '../enums';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  image: string | null;
}

export const toUserDto = (user: User): AppUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  roles: user.roles as UserRole[]
});

