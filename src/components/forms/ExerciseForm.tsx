import { FormInputField } from '@/components/form/FormInputField';
import FormSelectField from '@/components/form/FormSelectField';
import FormDialog from '@/components/FormDialog';
import useAppForm from '@/hooks/useAppForm';
import { formResolver } from '@/lib/form-resolver';
import { createExerciseSchema, CreateExerciseInput } from '@/lib/schemas';
import { ExerciseType } from '@/lib/enums';
import { Button } from '@/components/ui/button';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { ExerciseDto } from '@/lib/dtos';

const exerciseTypeOptions = Object.values(ExerciseType).map((t) => ({
  label: t.charAt(0) + t.slice(1).toLowerCase(),
  value: t,
}));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  mode: 'create' | 'edit';
  defaultValues?: ExerciseDto;
  onSubmit: (data: CreateExerciseInput) => void;
}

export function ExerciseForm({ open, setOpen, mode, defaultValues, onSubmit }: Props) {
  const form = useAppForm<CreateExerciseInput>({
    formName: 'ExerciseForm',
    resolver: formResolver(createExerciseSchema),
    defaultValues: {
      name: '',
      exerciseType: ExerciseType.CARDIO,
      caloriesPerMin: null,
    },
  });

  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      form.reset({
        name: defaultValues.name,
        exerciseType: defaultValues.exerciseType,
        caloriesPerMin: defaultValues.caloriesPerMin,
      });
    } else {
      form.reset({
        name: '',
        exerciseType: ExerciseType.CARDIO,
        caloriesPerMin: null,
      });
    }
  }, [defaultValues?.id, mode, open]);

  const handleSubmit = (data: CreateExerciseInput) => {
    onSubmit({
      ...data,
      caloriesPerMin: data.caloriesPerMin || null,
    });
  };

  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title={mode === 'create' ? 'Add Exercise' : 'Edit Exercise'}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
          <FormInputField name='name' label='Name' required />
          <FormSelectField name='exerciseType' label='Type' options={exerciseTypeOptions} required />
          <FormInputField name='caloriesPerMin' label='Calories per Minute' type='number' />
          <Button type='submit' className='w-full mt-2'>
            {mode === 'create' ? 'Save' : 'Update'}
          </Button>
        </form>
      </FormProvider>
    </FormDialog>
  );
}
