import z from 'zod';
import { ExerciseType } from '../enums';

export const createExerciseSchema = z
  .object({
    name: z.string().min(1),
    caloriesPerMin: z.coerce.number().optional(),
    exerciseType: z.enum(ExerciseType),
  })
  .strict();

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
