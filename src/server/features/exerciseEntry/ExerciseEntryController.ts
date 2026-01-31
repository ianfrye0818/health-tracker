import {
  createExerciseEntrySchema,
  updateExerciseEntrySchema,
} from '@/lib/schemas';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { createExerciseEntry } from './createExerciseEntry.server';
import { deleteExerciseEntry } from './deleteExerciseEntry.server';
import { getExerciseEntries } from './getExerciseEntries.server';
import { updateExerciseEntry } from './updateExerciseEntry.server';

export const GetExerciseEntriesFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => getExerciseEntries(context.user));

export const CreateExerciseEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createExerciseEntrySchema))
  .handler(async ({ data, context }) =>
    createExerciseEntry(data, context.user)
  );

export const UpdateExerciseEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateExerciseEntrySchema))
  .handler(async ({ data, context }) =>
    updateExerciseEntry(data, context.user)
  );

export const DeleteExerciseEntryFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }) =>
    deleteExerciseEntry(data.id, context.user)
  );
