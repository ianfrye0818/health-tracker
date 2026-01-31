import { createWaterEntryInputSchema, updateWaterEntryInputSchema } from '@/lib/schemas';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { createWaterEntry } from './createWaterEntry.server.ts.ts';
import { deleteWaterEntry } from './deleteWaterEntry.server.ts';
import { getWaterEntries } from './getWaterEntries.server.ts.ts';
import { updateWaterEntry } from './updateWater.server.ts';

export const GetWaterEntriesFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => getWaterEntries(context.user));

export const CreateWaterEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createWaterEntryInputSchema))
  .handler(async ({ data, context }) => createWaterEntry(data, context.user));

export const UpdateWaterEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateWaterEntryInputSchema))
  .handler(async ({ data, context }) => updateWaterEntry(data, context.user));
  
export const DeleteWaterEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }) =>
    deleteWaterEntry(data.id, context.user)
  );
