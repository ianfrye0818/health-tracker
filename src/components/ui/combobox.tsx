import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import ErrorMessage from '../ErrorMessage';

export type ComboboxItem = {
  value: string;
  label: string;
};

export interface ComboboxProps {
  data: ComboboxItem[] | undefined;
  values?: string[];
  setValues?: (values: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  triggerClassname?: string;
  multiple?: boolean;
  disabled?: boolean;
  commandItemClassName?: string;
  onClear?: () => void;
  action?: () => void;
  actionLabel?: string;
  trigger?: React.ReactNode;
  contentClassName?: string;
  label?: string;
  required?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  itemAction?: (value: string) => void;
  itemActionIcon?: React.ReactNode;
  errorMessage?: string;
}

export function Combobox({
  data,
  values,
  setValues,
  placeholder = 'Select items...',
  emptyMessage = 'No items found.',
  triggerClassname: className,
  multiple = true,
  disabled = false,
  commandItemClassName,
  action,
  actionLabel = 'Apply',
  trigger,
  contentClassName,
  label,
  required = false,
  align = 'start',
  side = 'bottom',
  itemAction,
  itemActionIcon,
  errorMessage,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = React.useCallback(
    (value: string) => {
      let newSelected: string[];

      if (multiple) {
        newSelected = values?.includes(value)
          ? values.filter((item) => item !== value)
          : [...(values || []), value];
      } else {
        newSelected = [value];
        setOpen(false);
      }

      setValues?.(newSelected);
    },
    [multiple, setValues, values]
  );

  const getDisplayValue = React.useCallback(() => {
    if (!values || values.length === 0) {
      // Show placeholder if nothing is selected
      return placeholder;
    } else if (values.length === 1) {
      // Show the actual value if exactly one item is selected
      return data?.find((item) => item.value === values[0])?.label || placeholder;
    } else {
      // Show "X items selected" if more than one item is selected
      return `${values.length} items selected`;
    }
  }, [data, placeholder, values]);

  if (!data) return null;

  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <Label className='text-sm font-medium'>
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>
      )}
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          {trigger ?? (
            <Button
              disabled={disabled}
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className={cn('w-full justify-between', className)}
            >
              <span
                className={cn(
                  'truncate',
                  placeholder && values?.length === 0 && 'text-muted-foreground'
                )}
              >
                {getDisplayValue()}
              </span>
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-(--radix-popover-trigger-width) p-0', contentClassName)}
          align={align}
          side={side}
        >
          <Command
            filter={(value, search) => {
              if (!search) return 1;
              const item = data.find((item) => item.value === value);
              const searchLower = search.toLowerCase();
              const labelMatch = item?.label.toLowerCase().includes(searchLower);
              const valueMatch = item?.value.toLowerCase().includes(searchLower);

              if (labelMatch && valueMatch) return 3;
              if (labelMatch) return 2;
              if (valueMatch) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandList
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={handleSelect}
                    className={cn('cursor-pointer', commandItemClassName)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        values?.includes(item.value) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item.label}
                    {itemAction && itemActionIcon && (
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={(e) => {
                          e.stopPropagation();
                          itemAction(item.value);
                        }}
                      >
                        {itemActionIcon}
                      </Button>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {action && (
            <div className='p-2'>
              <Button
                variant={'outline'}
                className='w-full'
                onClick={() => {
                  action();
                  setOpen(false);
                }}
              >
                {actionLabel}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <ErrorMessage message={errorMessage} />
    </div>
  );
}