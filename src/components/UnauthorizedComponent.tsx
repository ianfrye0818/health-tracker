import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from '@tanstack/react-router';
import { AlertTriangle } from 'lucide-react';

type Props = {
  message?: string;
};

export default function UnauthorizedComponent({ message }: Props) {
  const router = useRouter();
  return (
    <div className='flex items-center justify-center min-h-screen p-6 bg-background'>
      <Card className='w-full max-w-md border border-border shadow-lg rounded-2xl'>
        <CardContent className='p-8 flex flex-col items-center text-center'>
          <AlertTriangle className='w-12 h-12 text-yellow-500 mb-4' />
          <h1 className='text-2xl font-bold mb-2'>Unauthorized</h1>
          <p className='text-muted-foreground mb-6'>
            {message || 'You do not have permission to view this page.'}
          </p>
          <Button onClick={() => router.navigate({ to: '/' })}>Go Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
