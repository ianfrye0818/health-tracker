import z from "zod";

export const registerUserInputSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).strict()
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
  }
})

export type RegisterUserInput = z.infer<typeof registerUserInputSchema>
