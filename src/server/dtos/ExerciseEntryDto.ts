import { Prisma } from '@prisma/generated';
import { Intensity } from '../enums';
import { ExerciseDto, toExerciseDto } from './ExerciseDto';

export type DbExerciseEntry = Prisma.ExerciseEntryGetPayload<{
  include: {
    user: true;
    exercise: true;
  };
}>;

export interface ExerciseEntryDto {
  id: number;
  duration: number; // in min
  caloriesBurned: number | null;
  intensity: Intensity;
  dateTime: Date;
  notes: string | null;
  exercise: ExerciseDto | null;
  user: {
    id: string;
    name: string;
  };
}

export function toExerciseEntryDto(
  exerciseEntry: DbExerciseEntry
): ExerciseEntryDto {
  return {
    id: exerciseEntry.id,
    duration: exerciseEntry.duration,
    caloriesBurned: exerciseEntry.caloriesBurned,
    intensity: exerciseEntry.intensity as Intensity,
    dateTime: exerciseEntry.dateTime,
    notes: exerciseEntry.notes,
    exercise: exerciseEntry.exercise
      ? toExerciseDto(exerciseEntry.exercise)
      : null,
    user: {
      id: exerciseEntry.user.id,
      name: exerciseEntry.user.name,
    },
  };
}
