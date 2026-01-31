import { loginInputSchema } from "@/lib/schemas/loginInputSchema";
import { registerUserInputSchema } from "@/lib/schemas/registerUserInputSchema";
import { SessionUser } from "@/lib/session";
import { authMiddleware } from "@/server/middleware";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { getCurrentUser } from "./getCurrentUser.server";
import { loginUser } from "./loginUser.server";
import { logoutUser } from "./logoutUser.server";
import { registerUser } from "./registerUser.server";

export const GetCurrentUserFn = createServerFn({ method: 'GET'})
.handler(async (): Promise<SessionUser | null> => getCurrentUser());

export const RegisterUserFn = createServerFn({ method: 'POST'})
.inputValidator(zodValidator(registerUserInputSchema))
.handler(async ({ data }) => registerUser(data));

export const LoginUserFn = createServerFn({ method: 'POST'})
.inputValidator(zodValidator(loginInputSchema))
.handler(async ({ data }) => loginUser(data.email, data.password));

export const LogoutUserFn = createServerFn({ method: 'POST'})
.middleware([authMiddleware])
.handler(async () => logoutUser());