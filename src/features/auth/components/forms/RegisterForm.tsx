import { useAppForm } from "@/hooks/form"
import { RegisterUserInput, registerUserInputSchema } from "@/server/schemas/registerUserInputSchema"

export const RegisterForm = () => {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: undefined
    } as RegisterUserInput,
    validators: {
      onSubmit: registerUserInputSchema,
    },
    onSubmit: async ({ value }) => {
      //TODO: Register User
      console.log(value);
    }
  })


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit()
    }}>

    </form>
  )


}
