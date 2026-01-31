import { LogoutUserFn } from "@/server/features/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useLogoutUser = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async () => LogoutUserFn,
        onSuccess: () => {
            router.navigate({ to: '/login'})
        }
    })
}