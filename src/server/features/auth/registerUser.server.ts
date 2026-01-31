import { prisma } from "@/db";
import { BadRequestException } from "@/exceptions";
import { AppUser, toUserDto } from "@/lib/dtos";
import { UserRole } from "@/lib/enums";
import { RegisterUserInput } from "@/lib/schemas/registerUserInputSchema";
import { useAppSession } from "@/lib/session";
import * as bcrypt from 'bcrypt';
import { randomUUID } from "crypto";

export const registerUser = async (data: RegisterUserInput): Promise<AppUser> => {
    const existing = await prisma.user.findUnique({ where: { email: data.email }})

    if (existing) throw new BadRequestException('Account already exists');

    const passwordHash = await bcrypt.hash(data.password,12);

    const user = await prisma.user.create({
        data: {
            id: randomUUID(),
            name: data.name,
            passwordHash,
            email: data.email,
            image: data.image,
            roles: [UserRole.USER]
        }
    })

    const session = await useAppSession();

    await session.update({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles as UserRole[]
    })

    return toUserDto(user);
}