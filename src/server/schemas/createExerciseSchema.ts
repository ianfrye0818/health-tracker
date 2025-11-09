import z from 'zod';
import { ExerciseType } from '../enums';

export const createExerciseSchema = z
  .object({
    name: z.string().min(1),
    exerciseType: z.enum(ExerciseType),
    caloriesPerMin: z.coerce.number().nullable(),
  })
  .strict();

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
