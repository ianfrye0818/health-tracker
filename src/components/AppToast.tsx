import { AlertCircleIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { Action, toast as sonnerToast } from 'sonner';
import { Spinner } from './ui/spinner';

type ToastOptions = Parameters<typeof sonnerToast>[1];

const defaultToastStyles: ToastOptions = {
  position: 'top-right',
  duration: 3000,
};
const actionButtonStyles: Action['actionButtonStyle'] = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid black',
  borderRadius: '4px',
  padding: '4px 8px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const successToastStyles: ToastOptions = {
  ...defaultToastStyles,
  style: {
    backgroundColor: 'green',
    color: 'white',
  },
};

const errorToastStyles: ToastOptions = {
  ...defaultToastStyles,
  style: {
    backgroundColor: 'red',
    color: 'white',
  },
};

const infoToastStyles: ToastOptions = {
  ...defaultToastStyles,
  style: {
    backgroundColor: 'orange',
    color: 'white',
  },
};

const warningToastStyles: ToastOptions = {
  ...defaultToastStyles,
  style: {
    backgroundColor: 'yellow',
    color: 'white',
  },
};

const loadingToastStyles: ToastOptions = {
  ...defaultToastStyles,
  style: {
    backgroundColor: 'blue',
    color: 'white',
  },
};

export const appToast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      ...successToastStyles,
      ...options,
      dismissible: true,
      closeButton: true,
      icon: <CheckCircleIcon />,
      action: {
        ...(options?.action as Action),
        actionButtonStyle: actionButtonStyles,
      },
    });
  },

  error: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      ...errorToastStyles,
      ...options,
      dismissible: true,
      closeButton: true,
      icon: <AlertCircleIcon />,
      action: {
        ...(options?.action as Action),
        actionButtonStyle: actionButtonStyles,
      },
    });
  },

  info: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      dismissible: true,
      closeButton: true,
      icon: <InfoIcon />,
      ...infoToastStyles,
      ...options,
      action: {
        ...(options?.action as Action),
        actionButtonStyle: actionButtonStyles,
      },
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      dismissible: true,
      closeButton: true,
      icon: <AlertCircleIcon />,
      ...options,
      ...warningToastStyles,
      action: {
        ...(options?.action as Action),
        actionButtonStyle: actionButtonStyles,
      },
    });
  },

  loading: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      dismissible: true,
      closeButton: true,
      icon: <Spinner />,
      ...loadingToastStyles,
      ...options,
      action: {
        ...(options?.action as Action),
        actionButtonStyle: actionButtonStyles,
      },
    });
  },

  default: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      icon: <InfoIcon />,
      dismissible: true,
      closeButton: true,
      ...options,
      ...defaultToastStyles,
      action: {
        actionButtonStyle: actionButtonStyles,
        ...(options?.action as Action),
      },
    });
  },
};
