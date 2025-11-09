import z from 'zod';
import { Position } from '../enums';

export const createBloodPressureInputSchema = z
  .object({
    systolic: z.coerce.number(),
    diastolic: z.coerce.number(),
    pulse: z.coerce.number().nullable(),
    oxygenSaturation: z.coerce.number().nullable(),
    position: z.enum(Position).default(Position.SITTING),
    notes: z.string().nullable(),
    date: z.coerce.date().default(new Date()),
  })
  .strict();

export type CreateBloodPressureInput = z.infer<
  typeof createBloodPressureInputSchema
>;
