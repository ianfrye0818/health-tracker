import { RegisterUserInput } from "@/lib/schemas/registerUserInputSchema";
import { RegisterUserFn } from "@/server/features/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useRegisterUser = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: (payload: RegisterUserInput) => RegisterUserFn({ data: payload }),
        onSuccess: () => {
            router.navigate({ to: '/dashboard'})
        }
    })
}