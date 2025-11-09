import z from 'zod';
import { Intensity } from '../enums';

export const createExerciseEntrySchema = z
  .object({
    duration: z.coerce.number(),
    caloriesBurned: z.coerce.number().optional(),
    intensity: z.enum(Intensity).default(Intensity.MODERATE),
    dateTime: z.coerce.date().default(new Date()),
    exerciseId: z.coerce.number().optional(),
    notes: z.string().optional(),
  })
  .strict();

export type CreateExerciseEntryInput = z.infer<
  typeof createExerciseEntrySchema
>;
