import { useFieldContext } from '@/hooks/form-context';
import { useStore } from '@tanstack/react-form';
import {
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  Field,
  FieldContent,
} from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props extends React.ComponentProps<typeof Select> {
  label?: string;
  discription?: string;
  triggerProps?: React.ComponentProps<typeof SelectTrigger>;
  placeHolder?: string;
  options?: SelectOption[];
}

export function SelectField({
  label,
  discription,
  triggerProps,
  placeHolder,
  options = [],
  ...props
}: Props) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FieldGroup>
      <Field
        data-invalid={isInvalid}
        orientation={'responsive'}
      >
        <FieldContent>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        </FieldContent>
        <Select
          name={field.name}
          value={field.state.value}
          onValueChange={field.handleChange}
          {...props}
        >
          <SelectTrigger
            className={cn('min-w-[120px]', triggerProps?.className)}
            {...triggerProps}
          >
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {discription && <FieldDescription>{discription}</FieldDescription>}
        {isInvalid && <FieldError errors={errors} />}
      </Field>
    </FieldGroup>
  );
}
