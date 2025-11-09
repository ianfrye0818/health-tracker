import { Button } from '@/components/ui/button';
import { useFormContext } from '@/hooks/form-context';
import { Spinner } from '../ui/spinner';

type Props = {
  setOpen?: (open: boolean) => void;
  pending?: boolean;
};

export function PopupFormButtons({ setOpen, pending }: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <div className='form-buttons'>
          <Button
            type='button'
            variant='outline'
            disabled={isSubmitting || pending}
            onClick={() => {
              form.reset();
              setOpen?.(false);
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting || pending} type='submit'>
            {isSubmitting || pending ? <Spinner /> : 'Submit'}
          </Button>
        </div>
      )}
    </form.Subscribe>
  );
}
