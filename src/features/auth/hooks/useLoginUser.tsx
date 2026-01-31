import { LoginInput } from "@/lib/schemas/loginInputSchema";
import { LoginUserFn } from "@/server/features/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useLoginUser = () => {
const router = useRouter();

return useMutation({
  mutationFn: (payload: LoginInput) => LoginUserFn({ data: payload}),
  onSuccess: () => {
    router.navigate({ to: '/dashboard'})
  }
})
}
