import { Logger } from '@/lib/Logger';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues
> extends UseFormProps<TFieldValues, TContext, TTransformedValues> {
  formName: string;
}

export default function useAppForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues
>({ formName, ...props }: Props<TFieldValues, TContext, TTransformedValues>) {
  const logger = new Logger(formName);
  const form = useForm<TFieldValues, TContext, TTransformedValues>(props);

  if (Object.keys(form.formState.errors).length > 0) {
    logger.warn('[Form Errors]', form.formState.errors);
  }

  return form;
}