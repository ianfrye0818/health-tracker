import { useFieldContext } from '@/hooks/form-context';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { useStore } from '@tanstack/react-form';
import { Textarea } from '../ui/textarea';
import React from 'react';

interface Props extends React.ComponentProps<typeof Textarea> {
  label?: string;
  description?: string;
}

export function TextAreaField({ label, description, ...props }: Props) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FieldGroup>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>More about you</FieldLabel>
        <Textarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          {...props}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
        {isInvalid && <FieldError errors={errors} />}
      </Field>
    </FieldGroup>
  );
}
