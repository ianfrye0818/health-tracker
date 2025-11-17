import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { z } from 'zod';
import { Field, FieldError, FieldGroup } from '../ui/field';
import { Textarea } from '../ui/textarea';

interface Props<T extends z.ZodType<FieldValues>>
  extends React.ComponentProps<typeof Textarea> {
  name: FieldPath<z.infer<T>>;
  label?: string;
}

export function FormTextAreaItem<T extends z.ZodType<FieldValues>>({
  name,
  label,
  ...props
}: Props<T>) {
  const form = useFormContext<z.infer<T>>();
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {label} {props.required && <span className='text-red-500'>*</span>}{' '}
            <Textarea {...field} {...props} />
            {(fieldState.invalid || fieldState.error) && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
