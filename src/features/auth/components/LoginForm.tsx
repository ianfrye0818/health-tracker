import ErrorMessage from '@/components/ErrorMessage';
import { FormInputField } from '@/components/form/FormInputField';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { LoginInput, loginInputSchema } from '@/lib/schemas/loginInputSchema';
import { Link } from '@tanstack/react-router';
import { FormProvider } from 'react-hook-form';
import { useLoginUser } from '../hooks';

export function LoginForm() {
  const { mutateAsync: loginUser, isPending } = useLoginUser();
  const form = useAppForm<LoginInput>({
    formName: 'LoginForm',
    resolver: formResolver(loginInputSchema),
    defaultValues: {
        email: '',
        password: '',
    },
  });

  const isSubmitting = isPending || form.formState.isSubmitting;

  const onSubmit = async (data: LoginInput) => {
    await loginUser(data);
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormInputField<typeof loginInputSchema>
          name='email'
          label='Email'
          type='email'
          placeholder='Enter your email'
          autoComplete='email'
          required
        />
        <FormInputField<typeof loginInputSchema>
          name='password'
          label='Password'
          type='password'
          placeholder='Enter your password'
          required
          autoComplete='current-password'
        />
        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full'
        >
          {isSubmitting ? <Spinner /> : 'Login'}
        </Button>
        <p>Don't have an account? <Link className='text-blue-500 hover:underline' to='/register'>Register</Link></p>
        <ErrorMessage message={form.formState.errors.root?.message} />
      </form>
    </FormProvider>
  );
}