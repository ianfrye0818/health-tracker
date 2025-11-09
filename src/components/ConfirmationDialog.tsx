import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ErrorMessage from './ErrorMessage';
import { Spinner } from './ui/spinner';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string | React.ReactNode;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  isLoading?: boolean;
  errorMessage?: string;
};
export function ConfirmationDialog({
  open,
  setOpen,
  onConfirm,
  onCancel,
  title,
  description,
  cancelButtonText,
  confirmButtonText,
  confirmButtonProps,
  cancelButtonProps,
  isLoading,
  errorMessage,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || 'Confirm'}</DialogTitle>
          <DialogDescription>
            {description || 'Are you sure you want to perform this action?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            variant={cancelButtonProps?.variant || 'outline'}
            onClick={onCancel ? onCancel : () => setOpen(false)}
            {...cancelButtonProps}
          >
            {cancelButtonText || 'Cancel'}
          </Button>
          <Button
            disabled={isLoading}
            variant={confirmButtonProps?.variant || 'destructive'}
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            {...confirmButtonProps}
          >
            {isLoading ? <Spinner /> : confirmButtonText || 'Confirm'}
          </Button>
        </DialogFooter>
        <ErrorMessage message={errorMessage} />
      </DialogContent>
    </Dialog>
  );
}
