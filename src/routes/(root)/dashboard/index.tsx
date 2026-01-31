import { Card, CardContent } from '@/components/ui/card';
import { useGetUsersBloodPressureEntries } from '@/features/bloodPressureEntries/hooks/useBloodPressureEntries';
import { useGetUsersExerciseEntries } from '@/features/exerciseEntries/hooks/useExerciseEntries';
import { useGetExercises } from '@/features/exercises/hooks/useExercises';
import { useGetUsersWeightEntries } from '@/features/weightEntries/hooks/useWeightEntries';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Activity, Dumbbell, Heart, TrendingDown } from 'lucide-react';

export const Route = createFileRoute('/(root)/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: bpEntries } = useGetUsersBloodPressureEntries();
  const { data: weightEntries } = useGetUsersWeightEntries();
  const { data: exercises } = useGetExercises();
  const { data: exerciseEntries } = useGetUsersExerciseEntries();

  const latestBP = (bpEntries ?? [])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const latestWeight = (weightEntries ?? [])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className='px-4 py-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Link to='/blood-pressure' className='block'>
          <Card className='h-full hover:shadow-md transition-shadow'>
            <CardContent className='flex flex-col gap-3 pt-2'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-red-100 dark:bg-red-900/30'>
                  <Heart className='h-5 w-5 text-red-500' />
                </div>
                <span className='text-sm font-medium text-muted-foreground'>Blood Pressure</span>
              </div>
              <div>
                <p className='text-2xl font-bold'>
                  {latestBP ? `${latestBP.systolic}/${latestBP.diastolic}` : '—'}
                </p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  {latestBP
                    ? `${latestBP.position.charAt(0) + latestBP.position.slice(1).toLowerCase()} · ${format(new Date(latestBP.date), 'MMM d, yyyy')}`
                    : 'No entries yet'}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to='/weight' className='block'>
          <Card className='h-full hover:shadow-md transition-shadow'>
            <CardContent className='flex flex-col gap-3 pt-2'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30'>
                  <TrendingDown className='h-5 w-5 text-blue-500' />
                </div>
                <span className='text-sm font-medium text-muted-foreground'>Weight</span>
              </div>
              <div>
                <p className='text-2xl font-bold'>
                  {latestWeight ? `${latestWeight.weight} lbs` : '—'}
                </p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  {latestWeight
                    ? format(new Date(latestWeight.date), 'MMM d, yyyy')
                    : 'No entries yet'}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to='/exercises' className='block'>
          <Card className='h-full hover:shadow-md transition-shadow'>
            <CardContent className='flex flex-col gap-3 pt-2'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30'>
                  <Dumbbell className='h-5 w-5 text-purple-500' />
                </div>
                <span className='text-sm font-medium text-muted-foreground'>Exercises</span>
              </div>

              <div>
                <p className='text-2xl font-bold'>{(exercises ?? []).length}</p>
                <p className='text-xs text-muted-foreground mt-0.5'>exercises defined</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to='/exercise-log' className='block'>
          <Card className='h-full hover:shadow-md transition-shadow'>
            <CardContent className='flex flex-col gap-3 pt-2'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-green-100 dark:bg-green-900/30'>
                  <Activity className='h-5 w-5 text-green-500' />
                </div>
                <span className='text-sm font-medium text-muted-foreground'>Exercise Log</span>
              </div>
              <div>
                <p className='text-2xl font-bold'>{(exerciseEntries ?? []).length}</p>
                <p className='text-xs text-muted-foreground mt-0.5'>sessions logged</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
