import { Position } from '@/server/enums';
import z from 'zod';

export const updateBloodPressureInputSchema = z
  .object({
    id: z.coerce.number(),
    systolic: z.coerce.number().optional(),
    diastolic: z.coerce.number().optional(),
    pulse: z.coerce.number().optional(),
    oxygenSaturation: z.coerce.number().optional(),
    position: z.enum(Position).optional(),
    notes: z.string().optional(),
    date: z.coerce.date().optional(),
  })
  .strict();

export type UpdateBloodPressureInput = z.infer<
  typeof updateBloodPressureInputSchema
>;
