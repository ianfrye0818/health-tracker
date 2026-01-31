import { prisma } from "@/db";
import { UnauthorizedException } from "@/exceptions";
import { AppUser, toUserDto } from "@/lib/dtos";
import { UserRole } from "@/lib/enums";
import { useAppSession } from "@/lib/session";
import * as bcrypt from 'bcrypt';

export const loginUser = async (email: string, password: string): Promise<AppUser> => {
    const user = await prisma.user.findUnique({ where: { email }});

    if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(user.passwordHash, password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    

    const session = await useAppSession();

    await session.update({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles as UserRole[]
    })

    return toUserDto(user);

}