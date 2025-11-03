import { useFieldContext } from '@/hooks/form-context';
import { useStore } from '@tanstack/react-form';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import React from 'react';

interface Props extends React.ComponentProps<typeof Input> {
  label?: string;
  discription?: string;
}

export function TextField({ label, discription, ...props }: Props) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FieldGroup>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Field data-invalid={isInvalid}>
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          {...props}
        />
        {discription && <FieldDescription>{discription}</FieldDescription>}
        {isInvalid && <FieldError errors={errors} />}
      </Field>
    </FieldGroup>
  );
}
