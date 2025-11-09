import { authClient } from "@/lib/auth-client"
import { LoginInput } from "@/server/schemas/loginInputSchema"

export const useLoginUser = () => {
  const login = async (payload: LoginInput) => {
    const { data, error } = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
      callbackURL: '/',
      rememberMe: true
    })
    return { data, error }
  }
  return { login }
}
