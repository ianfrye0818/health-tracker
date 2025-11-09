import z from 'zod';
import { Intensity } from '../enums';

export const updateExerciseEntrySchema = z
  .object({
    id: z.coerce.number(),
    duration: z.coerce.number().optional(),
    caloriesBurned: z.coerce.number().nullish(),
    intensity: z.enum(Intensity).optional(),
    dateTime: z.coerce.date().optional(),
    exerciseId: z.coerce.number().nullish(),
    notes: z.string().nullish(),
  })
  .strict();

export type UpdateExerciseEntryInput = z.infer<
  typeof updateExerciseEntrySchema
>;
