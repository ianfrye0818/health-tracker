import { useFieldContext } from '@/hooks/form-context';
import { useStore } from '@tanstack/react-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Checkbox } from '../ui/checkbox';

interface Props {
  label?: string;
}

export function CheckboxField({ label }: Props) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FieldGroup>
      <Field data-invalid={isInvalid}>
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked as boolean)}
        />
        {label && <FieldLabel>{label}</FieldLabel>}
        {isInvalid && <FieldError errors={errors} />}
      </Field>
    </FieldGroup>
  );
}
