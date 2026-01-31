import ErrorMessage from '@/components/ErrorMessage';
import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { RegisterUserInput, registerUserInputSchema } from '@/lib/schemas/registerUserInputSchema';
import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useRegisterUser } from '../hooks';

export function RegisterForm() {
  const { mutateAsync: registerUser, isPending } = useRegisterUser();
  const form = useAppForm<RegisterUserInput>({
    formName: 'RegisterForm',
    resolver: formResolver(registerUserInputSchema),
    defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
  });

  const isSubmitting = isPending || form.formState.isSubmitting;

  const onSubmit = async (data: RegisterUserInput) => {
    await registerUser(data);
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormInputField<typeof registerUserInputSchema>
          name='name'
          label='Full Name'
          placeholder='Enter your full name'
          autoComplete='name'
          required
        />  
        <FormInputField<typeof registerUserInputSchema>
        name='email'
        label='Email'
        type='email'
        placeholder='Enter your email'
        autoComplete='email'
        required
      />
        <FormInputField<typeof registerUserInputSchema>
          name='password'
          label='Password'
          type='password'
          placeholder='Enter your password'
          required
          autoComplete='current-password'
        />
        <FormInputField<typeof registerUserInputSchema>
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          placeholder='Confirm your password'
          required
          autoComplete='confirm-password'
        />
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full'
        >
          {isSubmitting ? <Spinner /> : 'Register'}
        </Button>
        <p>Already have an account? <Link className='text-blue-500 hover:underline' to='/login'>Login</Link></p>
        <ErrorMessage message={form.formState.errors.root?.message} />
      </form>
    </FormProvider>
  );
}