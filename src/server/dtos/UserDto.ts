import { User } from "@prisma/generated";

export interface UserDto {
    id: string;
    name: string;
    email: string;
    image: string | null;
  }


  export function toUserDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    }
  }