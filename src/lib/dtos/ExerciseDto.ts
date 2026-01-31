import { Prisma } from '@prisma/generated';
import { ExerciseType } from '../enums';
import { ObjectRef } from './ObjectRef';

export const ExerciseInclude = {
  user: true,
};

export type DbExercise = Prisma.ExerciseGetPayload<{
  include: typeof ExerciseInclude;
}>;

export interface ExerciseDto {
  id: number;
  name: string;
  caloriesPerMin: number | null;
  exerciseType: ExerciseType;
  user: ObjectRef;
}

export const toExerciseDto = (exercise: DbExercise): ExerciseDto => ({
  id: exercise.id,
  name: exercise.name,
  caloriesPerMin: exercise.caloriesPerMin,
  exerciseType: exercise.exerciseType as ExerciseType,
  user: {
    key: exercise.user.id,
    value: exercise.user.name,
  },
});
