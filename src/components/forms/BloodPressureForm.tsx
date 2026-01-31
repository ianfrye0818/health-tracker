import { FormInputField } from '@/components/form/FormInputField';
import { FormDatePickerItem } from '@/components/form/FormDatePicker';
import { FormTextAreaItem } from '@/components/form/FormTextareaField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDialog from '@/components/FormDialog';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { createBloodPressureInputSchema, CreateBloodPressureInput } from '@/lib/schemas';
import { Position } from '@/lib/enums';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { BloodPressureEntryDto } from '@/lib/dtos';

const positionOptions = Object.values(Position).map((p) => ({
  label: p.charAt(0) + p.slice(1).toLowerCase(),
  value: p,
}));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: 'create' | 'edit';
  defaultValues?: BloodPressureEntryDto;
  onSubmit: (data: CreateBloodPressureInput) => void;
}

export function BloodPressureForm({ open, setOpen, mode, defaultValues, onSubmit }: Props) {
  const form = useAppForm<CreateBloodPressureInput>({
    formName: 'BloodPressureForm',
    resolver: formResolver(createBloodPressureInputSchema),
    defaultValues: {
      systolic: 0,
      diastolic: 0,
      pulse: null,
      oxygenSaturation: null,
      position: Position.SITTING,
      notes: null,
      date: new Date(),
    },
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      form.reset({
        systolic: defaultValues.systolic,
        diastolic: defaultValues.diastolic,
        pulse: defaultValues.pulse,
        oxygenSaturation: defaultValues.oxygenSaturation,
        position: defaultValues.position as Position,
        notes: defaultValues.notes,
        date: new Date(defaultValues.date),
      });
    } else {
      form.reset({
        systolic: 0,
        diastolic: 0,
        pulse: null,
        oxygenSaturation: null,
        position: Position.SITTING,
        notes: null,
        date: new Date(),
      });
    }
  }, [defaultValues?.id, mode, open]);

  const handleSubmit = (data: CreateBloodPressureInput) => {
    onSubmit({
      ...data,
      pulse: data.pulse || null,
      oxygenSaturation: data.oxygenSaturation || null,
    });
  };

  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title={mode === 'create' ? 'Add Blood Pressure Entry' : 'Edit Blood Pressure Entry'}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
          <FormInputField name='systolic' label='Systolic' type='number' required />
          <FormInputField name='diastolic' label='Diastolic' type='number' required />
          <FormInputField name='pulse' label='Pulse' type='number' />
          <FormInputField name='oxygenSaturation' label='Oxygen Saturation (%)' type='number' />
          <FormSelectField name='position' label='Position' options={positionOptions} required />
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
