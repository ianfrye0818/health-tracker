import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Logger } from '@/lib/Logger/Logger';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { z } from 'zod';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';

const logger = new Logger('FormDatePicker');
export interface Props<T extends z.ZodType<FieldValues>> {
  name: FieldPath<z.infer<T>>;
  label?: string;
  onChange?: (...event: any[]) => void;
  required?: boolean;
  disabled?: boolean | ((date: Date) => boolean);
  dropdownType?: 'dropdown' | 'dropdown-months' | 'dropdown-years';
  description?: string;
  popoverClassName?: string;
  startMonth?: Date;
  endMonth?: Date;
  defaultMonth?: Date;
}

export function FormDatePickerItem<T extends z.ZodType<FieldValues>>({
  name,
  label,
  required,
  dropdownType = 'dropdown',
  onChange,
  disabled,
  description,
  popoverClassName,
  startMonth = new Date(2025, 0, 1),
  endMonth = new Date(2050, 11, 31),
  defaultMonth,
}: Props<T>) {
  const form = useFormContext<z.infer<T>>();
  const handleSelect = (date: Date, field: any) => {
    if (onChange) {
      onChange(date);
    } else {
      field.onChange(date.toISOString());
    }
  };

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const getValidDate = (): Date | undefined => {
          const value: unknown = field.value;

          if (!value) return undefined;

          try {
            if (value instanceof Date) return value;

            if (typeof value === 'string') {
              const date = new Date(value);
              if (!isNaN(date.getTime())) {
                return date;
              }
            }

            return undefined;
          } catch (error) {
            logger.error('Error parsing date:', error);
            return undefined;
          }
        };

        const selectedDate = getValidDate();

        return (
          <Field className='flex flex-col' data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel>
                {label} {required && <span className='text-red-500'>*</span>}
              </FieldLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !selectedDate && 'text-muted-foreground'
                  )}
                >
                  {selectedDate ? (
                    format(selectedDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  'w-(--radix-popover-trigger-width) p-0 flex justify-center',
                  popoverClassName
                )}
                align='start'
              >
                <Calendar
                  mode={'single'}
                  selected={selectedDate}
                  onSelect={(date: any) =>
                    date && handleSelect(date as Date, field)
                  }
                  disabled={disabled}
                  required={required}
                  captionLayout={dropdownType}
                  endMonth={endMonth}
                  startMonth={startMonth}
                  defaultMonth={defaultMonth || selectedDate}
                />
              </PopoverContent>
            </Popover>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid ||
              (fieldState.error && <FieldError errors={[fieldState.error]} />)}
          </Field>
        );
      }}
    />
  );
}
