import { ActionFactory } from "@/lib/handleOptimistic"
import { ExerciseEntryDto } from "@/server/dtos"

export const EXERCISE_ENTRIES_QUERY_KEY = 'expercise-entries'
export const Actions = ActionFactory<ExerciseEntryDto, 'id'>('id')
