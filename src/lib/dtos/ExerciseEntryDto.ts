import { Prisma } from '@prisma/generated';
import { Intensity } from '../enums';
import { ExerciseDto, ExerciseInclude, toExerciseDto } from './ExerciseDto';
import { ObjectRef } from './ObjectRef';

export const ExcerciseEntryInclude = {
  user: true,
  exercise: {
    include: ExerciseInclude
  }
}

export type DbExerciseEntry = Prisma.ExerciseEntryGetPayload<{
  include: typeof ExcerciseEntryInclude;
}>;

export interface ExerciseEntryDto {
  id: number;
  duration: number; // in minutes
  caloriesBurned: number | null;
  intensity: Intensity;
  dateTime: Date;
  notes: string | null;
  exercise: ExerciseDto | null;
  user: ObjectRef;
}

export const toExerciseEntryDto = (
  exerciseEntry: DbExerciseEntry
): ExerciseEntryDto => ({
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
    key: exerciseEntry.user.id,
    value: exerciseEntry.user.name
  },
});
