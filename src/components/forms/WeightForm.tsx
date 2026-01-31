import { FormInputField } from '@/components/form/FormInputField';
import { FormDatePickerItem } from '@/components/form/FormDatePicker';
import { FormTextAreaItem } from '@/components/form/FormTextareaField';
import FormDialog from '@/components/FormDialog';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { createWeightEntryInputSchema, CreateWeightEntryInput } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { WeightEntryDto } from '@/lib/dtos';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: 'create' | 'edit';
  defaultValues?: WeightEntryDto;
  onSubmit: (data: CreateWeightEntryInput) => void;
}

export function WeightForm({ open, setOpen, mode, defaultValues, onSubmit }: Props) {
  const form = useAppForm<CreateWeightEntryInput>({
    formName: 'WeightForm',
    resolver: formResolver(createWeightEntryInputSchema),
    defaultValues: {
      weight: 0,
      notes: null,
      date: new Date(),
    },
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      form.reset({
        weight: defaultValues.weight,
        notes: defaultValues.notes,
        date: new Date(defaultValues.date),
      });
    } else {
      form.reset({
        weight: 0,
        notes: null,
        date: new Date(),
      });
    }
  }, [defaultValues?.id, mode, open]);

  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title={mode === 'create' ? 'Add Weight Entry' : 'Edit Weight Entry'}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormInputField name='weight' label='Weight (lbs)' type='number' required />
          <FormDatePickerItem name='date' label='Date' required />
          <FormTextAreaItem name='notes' label='Notes' />
          <Button type='submit' className='w-full mt-2'>
            {mode === 'create' ? 'Save' : 'Update'}
          </Button>
        </form>
      </FormProvider>
    </FormDialog>
  );
}
