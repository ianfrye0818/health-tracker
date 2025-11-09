import { Exercise as DbExercise } from '@prisma/generated';
import { ExerciseType } from '../enums';

export interface ExerciseDto {
  id: number;
  name: string;
  caloriesPerMin: number | null;
  exerciseType: ExerciseType;
}

export function toExerciseDto(exercise: DbExercise): ExerciseDto {
  return {
    id: exercise.id,
    name: exercise.name,
    caloriesPerMin: exercise.caloriesPerMin,
    exerciseType: exercise.exerciseType as ExerciseType,
  };
}
