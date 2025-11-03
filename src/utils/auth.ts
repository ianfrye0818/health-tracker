import { prisma } from '@/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { reactStartCookies } from 'better-auth/react-start';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  plugins: [reactStartCookies()],
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   google: {
  //     enabled: true,
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //  $ }
  // }
});
