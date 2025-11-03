import { useAppForm } from '@/hooks/form';
import { authClient } from '@/lib/auth-client';
import z from 'zod';

const schema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
    name: z.string().min(1, 'Name is required'),
    image: z.url().optional(),
    callbackURL: z.url().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

type Schema = z.infer<typeof schema>;

export function SignUpForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      image: '',
      callbackURL: '/dashboard',
    } as Schema,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      const { email, password, name, image, callbackURL } = value;

      const { data, error } = await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
          image, // User image URL (optional)
          callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onRequest: (ctx) => {
            // show a loading indicator
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit;
      }}
    >
      <form.AppField
        name='email'
        children={(field) => <field.TextField label='Email' />}
      />
      <form.AppField
        name='name'
        children={(field) => <field.TextField label='Username' />}
      />
      <div className='flex items-center gap-2'>
        <div className='w-1/2'>
          <form.AppField
            name='password'
            children={(field) => (
              <field.TextField
                label='Password'
                type='password'
              />
            )}
          />
        </div>
        <div className='w-1/2'>
          <form.AppField
            name='confirmPassword'
            children={(field) => (
              <field.TextField
                label='Confirm Passwrod'
                type='password'
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
