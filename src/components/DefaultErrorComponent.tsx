import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';

type Props = {
  message?: string;
};

export default function DefaultErrorComponent({ message }: Props) {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Card className='max-w-md w-full shadow-xl rounded-2xl border border-border'>
        <CardContent className='flex flex-col items-center text-center p-8'>
          <AlertCircle className='h-12 w-12 text-destructive mb-4' />
          <h2 className='text-xl font-semibold mb-2'>Something went wrong</h2>
          <p className='text-muted-foreground mb-4'>
            {message || 'An unexpected error occurred. Please try again later.'}
          </p>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => router.history.back()}>
              Go Back
            </Button>
            <Button onClick={() => router.navigate({ to: '/' })}>
              Go Home
            </Button>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
