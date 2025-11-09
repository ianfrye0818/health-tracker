import { ActionFactory } from "@/lib/handleOptimistic"
import { ExerciseDto } from "@/server/dtos"

export const EXERCISE_QUERY_KEY = 'exercies'
export const Actions = ActionFactory<ExerciseDto, 'id'>('id')
