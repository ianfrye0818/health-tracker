'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && contentRef.current) {
        // Small delay to allow keyboard to open
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };

    const content = contentRef.current;
    content.addEventListener('focusin', handleFocusIn);

    return () => {
      content.removeEventListener('focusin', handleFocusIn);
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent
        className={cn(
          'max-h-[calc(100dvh-2rem)] flex flex-col sm:min-w-[500px]',
          'top-4 translate-y-0 sm:top-[50%] sm:translate-y-[-50%]',
          contentProps?.className,
        )}
        {...contentProps}
      >
        <DialogHeader className='shrink-0'>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div
          ref={contentRef}
          className='overflow-y-auto flex-1 min-h-0 -mx-6 px-6 pb-4'
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}