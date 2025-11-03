import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-context';
import { TextField } from '@/components/form-components/TextField';
import { SelectField } from '@/components/form-components/SelectField';
import { TextAreaField } from '@/components/form-components/TextAreaField';
import { DatePickerField } from '@/components/form-components/DatePickerField';
import { CheckboxField } from '@/components/form-components/CheckboxField';
import { SubscribeButton } from '@/components/form-components/SubscribeButton';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
    TextAreaField,
    DatePickerField,
    CheckboxField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
