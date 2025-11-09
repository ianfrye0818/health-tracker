import z from 'zod';
import { ExerciseType } from '../enums';

export const updateExerciseInputSchema = z
  .object({
    id: z.coerce.number(),
    name: z.string().min(1).optional(),
    caloriesPerMin: z.coerce.number().optional(),
    exerciseType: z.enum(ExerciseType).optional(),
  })
  .strict();

export type UpdateExerciseInput = z.infer<typeof updateExerciseInputSchema>;
