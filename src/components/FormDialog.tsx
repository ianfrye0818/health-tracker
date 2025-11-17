import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface FormDialogProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function FormDialog({
  title,
  description,
  children,
  setOpen,
  open,
  contentProps,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          'w-full max-w-fit min-w-[500px]',
          contentProps?.className
        )}
        {...contentProps}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
