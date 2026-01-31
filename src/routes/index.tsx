import { Activity, Dumbbell, Heart, TrendingDown } from 'lucide-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/')({ component: App });

const features = [
  {
    icon: Heart,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    title: 'Blood Pressure',
    description: 'Log and monitor your blood pressure readings over time with position and pulse tracking.',
  },
  {
    icon: TrendingDown,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    title: 'Weight Tracking',
    description: 'Track your weight journey with date-stamped entries and optional notes.',
  },
  {
    icon: Dumbbell,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    title: 'Exercise Library',
    description: 'Define your own exercises with type and calorie information.',
  },
  {
    icon: Activity,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    title: 'Exercise Log',
    description: 'Record workout sessions with duration, intensity, and calories burned.',
  },
];

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between px-6 py-4 border-b'>
        <span className='text-lg font-semibold'>Health Tracker</span>
        <div className='flex gap-3'>
          <Link to='/login'>
            <Button variant='outline'>Log in</Button>
          </Link>
          <Link to='/register'>
            <Button>Get started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className='flex-1 flex flex-col items-center justify-center text-center px-6 py-20'>
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
          Take control of<br />your health journey
        </h1>
        <p className='text-muted-foreground text-lg max-w-xl mb-8'>
          A simple, private dashboard to log blood pressure, track weight, and monitor your fitness — all in one place.
        </p>
        <Link to='/register'>
          <Button size='lg' className='px-8'>Start tracking for free</Button>
        </Link>
      </section>

      {/* Features */}
      <section className='px-6 py-16 max-w-5xl mx-auto w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className='flex gap-4 pt-2'>
                  <div className={`shrink-0 p-3 rounded-lg ${feature.color}`}>
                    <Icon className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-semibold mb-1'>{feature.title}</h3>
                    <p className='text-sm text-muted-foreground'>{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t px-6 py-4 text-center text-xs text-muted-foreground'>
        <div className='flex justify-center gap-6'>
          <Link to='/privacy-policy' className='hover:underline'>Privacy Policy</Link>
          <Link to='/terms-of-service' className='hover:underline'>Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
