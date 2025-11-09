import { CheckboxField } from '@/components/form-components/CheckboxField';
import { DatePickerField } from '@/components/form-components/DatePickerField';
import { PopupFormButtons } from '@/components/form-components/PopupFormButtons';
import { SelectField } from '@/components/form-components/SelectField';
import { FormSubmitButton } from '@/components/form-components/SubscribeButton';
import { TextAreaField } from '@/components/form-components/TextAreaField';
import { TextField } from '@/components/form-components/TextField';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-context';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
    TextAreaField,
    DatePickerField,
    CheckboxField,
  },
  formComponents: {
    FormSubmitButton,
    PopupFormButtons,
  },
  fieldContext,
  formContext,
});
