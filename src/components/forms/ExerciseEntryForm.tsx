import { FormInputField } from '@/components/form/FormInputField';
import { FormDatePickerItem } from '@/components/form/FormDatePicker';
import { FormTextAreaItem } from '@/components/form/FormTextareaField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDialog from '@/components/FormDialog';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { createExerciseEntrySchema, CreateExerciseEntryInput } from '@/lib/schemas';
import { Intensity } from '@/lib/enums';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { ExerciseEntryDto } from '@/lib/dtos';

const intensityOptions = Object.values(Intensity).map((i) => ({
  label: i.charAt(0) + i.slice(1).toLowerCase(),
  value: i,
}));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: 'create' | 'edit';
  defaultValues?: ExerciseEntryDto;
  exerciseOptions: { label: string; value: string }[];
  onSubmit: (data: CreateExerciseEntryInput) => void;
}

export function ExerciseEntryForm({ open, setOpen, mode, defaultValues, exerciseOptions, onSubmit }: Props) {
  const form = useAppForm<CreateExerciseEntryInput>({
    formName: 'ExerciseEntryForm',
    resolver: formResolver(createExerciseEntrySchema),
    defaultValues: {
      duration: 0,
      caloriesBurned: null,
      intensity: Intensity.MODERATE,
      dateTime: new Date(),
      exerciseId: null,
      notes: null,
    },
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      form.reset({
        duration: defaultValues.duration,
        caloriesBurned: defaultValues.caloriesBurned,
        intensity: defaultValues.intensity,
        dateTime: new Date(defaultValues.dateTime),
        exerciseId: defaultValues.exercise?.id ?? null,
        notes: defaultValues.notes,
      });
    } else {
      form.reset({
        duration: 0,
        caloriesBurned: null,
        intensity: Intensity.MODERATE,
        dateTime: new Date(),
        exerciseId: null,
        notes: null,
      });
    }
  }, [defaultValues?.id, mode, open]);

  const handleSubmit = (data: CreateExerciseEntryInput) => {
    onSubmit({
      ...data,
      caloriesBurned: data.caloriesBurned || null,
      exerciseId: data.exerciseId || null,
    });
  };

  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title={mode === 'create' ? 'Add Exercise Entry' : 'Edit Exercise Entry'}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
          <FormInputField name='duration' label='Duration (minutes)' type='number' required />
          <FormSelectField name='intensity' label='Intensity' options={intensityOptions} required />
          <FormSelectField
            name='exerciseId'
            label='Exercise'
            options={exerciseOptions}
            placeHolder='Select exercise'
          />
          <FormInputField name='caloriesBurned' label='Calories Burned' type='number' />
          <FormDatePickerItem name='dateTime' label='Date' required />
          <FormTextAreaItem name='notes' label='Notes' />
          <Button type='submit' className='w-full mt-2'>
            {mode === 'create' ? 'Save' : 'Update'}
          </Button>
        </form>
      </FormProvider>
    </FormDialog>
  );
}
