import {
  createBloodPressureInputSchema,
  updateBloodPressureInputSchema,
} from '@/lib/schemas';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { createBloodPressureEntry } from './createBloodPressureEntry.server';
import { deleteBloodPressureEntry } from './deleteBloodPressureEntry.server';
import { getUserBloodPressureEntries } from './getUserBloodPressureEntries.server';
import { updateBloodPressureEntry } from './updateBloodPressureEntry.server';

export const CreateBloodPressureEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createBloodPressureInputSchema))
  .handler(async ({ data, context }) =>
    createBloodPressureEntry(data, context.user)
  );

export const GetBloodPressurEntriesFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => getUserBloodPressureEntries(context.user));

export const UpdateBloodPressureEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateBloodPressureInputSchema))
  .handler(async ({ data, context }) =>
    updateBloodPressureEntry(data, context.user)
  );

export const DeleteBloodPressureEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }) =>
    deleteBloodPressureEntry(data.id, context.user)
  );
