// NotFoundPage.tsx
import { Button } from '@/components/ui/button';
import { useRouter } from '@tanstack/react-router';
export default function NotFoundComponent() {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-2'>Page Not Found</h2>
      <p className='text-muted-foreground max-w-md mb-6'>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className='flex gap-2'>
        <Button onClick={() => router.history.back()} variant='outline'>
          Go Back
        </Button>
        <Button onClick={() => router.navigate({ to: '/' })}>Go Home</Button>
      </div>
    </div>
  );
}
