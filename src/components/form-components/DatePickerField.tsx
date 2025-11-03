import { useFieldContext } from '@/hooks/form-context';
import { useStore } from '@tanstack/react-form';
import { FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import React from 'react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface Props {
  label?: string;
  description?: string;
  placeholder?: string;
  popoverClassName?: string;
  disabled?: boolean | ((date: Date) => boolean);
  dropdownType?: 'dropdown' | 'dropdown-months' | 'dropdown-years';
  startMonth?: Date;
  endMonth?: Date;
}

export function DatePickerField({
  label,
  description,
  placeholder = 'Select a date',
  popoverClassName,
  disabled,
  dropdownType = 'dropdown',
  startMonth,
  endMonth,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<Date>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FieldGroup>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.state.value && 'text-muted-foreground'
            )}
          >
            {field.state.value ? (
              field.state.value.toLocaleDateString()
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'w-(--radix-popover-trigger-width) p-0 flex justify-center',
            popoverClassName
          )}
        >
          <Calendar
            mode={'single'}
            required={true}
            selected={field.state.value}
            onSelect={field.handleChange}
            disabled={disabled}
            captionLayout={dropdownType}
            endMonth={endMonth}
            startMonth={startMonth}
          />
        </PopoverContent>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </FieldGroup>
  );
}
