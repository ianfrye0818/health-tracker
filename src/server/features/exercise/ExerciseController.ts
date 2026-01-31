import { createExerciseSchema, updateExerciseInputSchema } from '@/lib/schemas';
import { authMiddleware } from '@/server/middleware';
import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { createExercise } from './createExercise.server';
import { deleteExercise } from './deleteExcercise.server';
import { getExercises } from './getExercises.server';
import { updateExercise } from './updateExcercise.server';

export const GetExercisesFn = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async ({ context }) => getExercises(context.user));

export const CreateExerciseFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(createExerciseSchema))
  .handler(async ({ data, context }) => createExercise(data, context.user));

export const UpdateExerciseFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(updateExerciseInputSchema))
  .handler(async ({ data, context }) => updateExercise(data, context.user));

export const DeleteExerciseFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(zodValidator(z.object({ id: z.coerce.number() })))
  .handler(async ({ data, context }) => deleteExercise(data.id, context.user));
