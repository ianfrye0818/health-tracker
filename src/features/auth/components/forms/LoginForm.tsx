import { useAppForm } from "@/hooks/form"
import { LoginInput, loginInputSchema } from "@/server/schemas/loginInputSchema"
import { useLoginUser } from "../../hooks/useAuth/useLoginUser"


export const LoginForm = () => {
  const { login } = useLoginUser();
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginInput,
    validators: {
      onSubmit: loginInputSchema,
    },
    onSubmit: async ({ value }) => {
      await login(value);
      //TODO: navigate to home?
    }
  })


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit()
    }}>
      <h1>Login</h1>
      <form.AppField
        name="email"
        children={(field) => <field.TextField label="Email" placeholder="Email" />} />
      <form.AppField
        name="password"
        children={(field) => <field.TextField label="Password" type="password" placeholder="Password" />} />

      <form.AppForm>
        <form.FormSubmitButton label="Login" />
      </form.AppForm>

    </form>
  )
}
