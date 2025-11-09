import z from "zod";

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(6, { message: 'Pasword must be at least 6 characters' })
})

export type LoginInput = z.infer<typeof loginInputSchema>;
