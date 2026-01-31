import { useSession } from '@tanstack/react-start/server';
import { UserRole } from './enums';
import { env } from './env';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}

export const useAppSession = () => {
  return useSession<SessionUser>({
    password: `${env.SESSION_SECRET}-v${env.SESSION_VERSION}`,
    name: 'app-session',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    },
  });
};
