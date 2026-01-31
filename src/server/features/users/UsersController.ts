import { UserRole } from '@/lib/enums';
import { requireRoles } from '@/server/middleware/requireRoles.middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { getUserDetails } from './getUserDetails.server';
import { getUsers } from './getUsers.server';

export const GetUsersDetailsFn = createServerFn({ method: 'GET' })
  .middleware([requireRoles([UserRole.ADMIN])])
  .inputValidator(zodValidator(z.object({ userId: z.string()})))
  .handler(async ({ data }) => getUserDetails(data.userId));


export const GetUsersFn = createServerFn({ method: 'GET' })
  .middleware([requireRoles([UserRole.ADMIN])])
  .handler(async () => getUsers());
