import { Exercise as DbExercise } from '@prisma/generated';
import { ExerciseType } from '../enums';

export interface ExerciseDto {
  id: number;
  name: string;
  caloriesMerMin: number | null;
  exerciseType: ExerciseType;
}

export function toExerciseDto(exercise: DbExercise): ExerciseDto {
  return {
    id: exercise.id,
    name: exercise.name,
    caloriesMerMin: exercise.caloriesPerMin,
    exerciseType: exercise.exerciseType as ExerciseType,
  };
}
