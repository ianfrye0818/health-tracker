import { appToast } from "@/components/AppToast";
import { CreateExerciseEntryInput } from "@/lib/schemas";
import { CreateExerciseEntryFn } from "@/server/features/exerciseEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EXERCISE_ENTRIES_QUERY_KEY } from "./shared";

export const useCreateExerciseEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateExerciseEntryInput) => CreateExerciseEntryFn({ data: payload }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [EXERCISE_ENTRIES_QUERY_KEY],
        type: 'all',
        exact: false,
      });
      appToast.success('Exercise Entry Created Successfully!');
    },
  });
};
