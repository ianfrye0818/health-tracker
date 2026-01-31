import { SelectContent, SelectValue } from '@radix-ui/react-select';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import z from 'zod';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Select, SelectItem, SelectTrigger } from '../ui/select';

interface Props<T extends z.ZodType<FieldValues>> {
  options: { label: string; value: string }[];
  name: FieldPath<z.infer<T>>;
  label?: string;
  description?: string;
  placeHolder?: string;
  required?: boolean;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  selectProps?: React.ComponentProps<typeof Select>;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
  contentProps?: React.ComponentProps<typeof SelectContent>;
  valueProps?: React.ComponentProps<typeof SelectValue>;
  itemProps?: React.ComponentProps<typeof SelectItem>;
}

export default function FormSelectField<T extends z.ZodType<FieldValues>>({
  options,
  name,
  label,
  description,
  placeHolder,
  containerProps,
  selectProps,
  triggerProps,
  contentProps,
  valueProps,
  itemProps,
  required,
}: Props<T>) {
  const form = useFormContext<z.infer<T>>();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div {...containerProps}>
          <Field orientation={'responsive'} data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel>
                {label}
                {required && <span className='text-red-500'>*</span>}
              </FieldLabel>
            )}
            <Select
              {...selectProps}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger {...triggerProps}>
                <SelectValue placeholder={placeHolder} {...valueProps} />
              </SelectTrigger>
              <SelectContent {...contentProps}>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} {...itemProps}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FieldDescription>{description}</FieldDescription>}
            {(fieldState.invalid || fieldState.error) && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        </div>
      )}
    />
  );
}
