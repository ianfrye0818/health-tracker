'use client';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

export interface Props<T extends z.ZodType<FieldValues>>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<z.infer<T>>;
  label?: string;
  description?: string;
}

export function FormInputField<T extends z.ZodType<FieldValues>>({
  name,
  label,
  description,
  ...props
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useFormContext<z.infer<T>>();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel>
              {label}{' '}
              {props.required && <span className='text-red-500'>*</span>}
            </FieldLabel>
          )}
          <InputGroup>
            <InputGroupInput
              {...field}
              {...props}
              type={props.type === 'password' && showPassword ? 'text' : props.type}
            />
            {props.type === 'password' && (
              <InputGroupAddon align={'inline-end'}>
                <ShowPasswordButton
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </InputGroupAddon>
            )}
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {(fieldState.invalid || fieldState.error) && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

function ShowPasswordButton({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}) {
  return (
    <Button
      variant='ghost'
      size='icon'
      type='button'
      className='h-8 w-8 p-0'
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOffIcon className='h-4 w-4' />
      ) : (
        <EyeIcon className='h-4 w-4' />
      )}
    </Button>
  );
}
