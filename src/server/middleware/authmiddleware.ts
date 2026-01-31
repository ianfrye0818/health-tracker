import { UnauthorizedException } from '@/exceptions';
import { SessionUser, useAppSession } from '@/lib/session';
import { createMiddleware } from '@tanstack/react-start';

export const authMiddleware = createMiddleware().server(
  async ({ next}) => {
    const session = await useAppSession();

    if (!session.data || !session.data.id) throw new UnauthorizedException('User not found in session');

    return next({
      context: { user: session.data as SessionUser },
    });
  }
);
