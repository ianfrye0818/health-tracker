import { ArrayDataWrapper } from '@/components/DataWrapper';
import { ExerciseEntryForm } from '@/components/forms/ExerciseEntryForm';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  useGetUsersExerciseEntries,
  useCreateExerciseEntry,
  useUpdateExerciseEntry,
  useDeleteExerciseEntry,
} from '@/features/exerciseEntries/hooks/useExerciseEntries';
import { useGetExercises } from '@/features/exercises/hooks/useExercises';
import { ExerciseEntryDto } from '@/lib/dtos';
import { CreateExerciseEntryInput } from '@/lib/schemas';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';

export const Route = createFileRoute('/(root)/exercise-log/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useGetUsersExerciseEntries();
  const { data: exercises } = useGetExercises();
  const createMutation = useCreateExerciseEntry();
  const updateMutation = useUpdateExerciseEntry();
  const deleteMutation = useDeleteExerciseEntry();
  const { isMobile } = useMediaQuery();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ExerciseEntryDto | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const exerciseOptions = useMemo(
    () =>
      (exercises ?? []).map((ex) => ({
        label: ex.name,
        value: String(ex.id),
      })),
    [exercises]
  );

  const handleSubmit = (formData: CreateExerciseEntryInput) => {
    if (editingEntry) {
      updateMutation.mutate({ id: editingEntry.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
    setFormOpen(false);
    setEditingEntry(null);
  };

  const openCreate = () => {
    setEditingEntry(null);
    setFormOpen(true);
  };

  const openEdit = (entry: ExerciseEntryDto) => {
    setEditingEntry(entry);
    setFormOpen(true);
  };

  return (
    <div className='px-4 py-6'>
      <Card>
        <CardHeader>
          <CardTitle>Exercise Log</CardTitle>
          <CardAction>
            <Button onClick={openCreate}>+ Add</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ArrayDataWrapper
            data={data}
            isLoading={isLoading}
            error={error}
            emptyMessage='No exercise log entries yet.'
          >
            {(items) =>
              isMobile ? (
                <MobileCards items={items} onEdit={openEdit} onDelete={(id) => setDeleteId(id)} />
              ) : (
                <DesktopTable items={items} onEdit={openEdit} onDelete={(id) => setDeleteId(id)} />
              )
            }
          </ArrayDataWrapper>
        </CardContent>
      </Card>

      <ExerciseEntryForm
        open={formOpen}
        setOpen={setFormOpen}
        mode={editingEntry ? 'edit' : 'create'}
        defaultValues={editingEntry ?? undefined}
        exerciseOptions={exerciseOptions}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        open={deleteId !== null}
        setOpen={(open) => !open && setDeleteId(null)}
        title='Delete Entry'
        description='Are you sure you want to delete this exercise log entry?'
        onConfirm={() => {
          deleteMutation.mutate(deleteId!);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

function DesktopTable({
  items,
  onEdit,
  onDelete,
}: {
  items: ExerciseEntryDto[];
  onEdit: (item: ExerciseEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='overflow-x-auto'>
      <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-x-4 min-w-[700px]'>
        <div className='grid grid-cols-subgrid col-span-full text-xs font-medium text-muted-foreground uppercase bg-muted/50 rounded-t-lg'>
          <div className='px-3 py-2'>Exercise</div>
          <div className='px-3 py-2'>Duration</div>
          <div className='px-3 py-2'>Intensity</div>
          <div className='px-3 py-2'>Calories</div>
          <div className='px-3 py-2'>Date</div>
          <div className='px-3 py-2'></div>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-subgrid col-span-full items-center border-t py-2.5 text-sm'
          >
            <div className='px-3 font-medium'>{item.exercise?.name ?? '—'}</div>
            <div className='px-3 text-muted-foreground'>{item.duration} min</div>
            <div className='px-3 text-muted-foreground capitalize'>
              {item.intensity.charAt(0) + item.intensity.slice(1).toLowerCase()}
            </div>
            <div className='px-3 text-muted-foreground'>
              {item.caloriesBurned != null ? item.caloriesBurned : '—'}
            </div>
            <div className='px-3 text-muted-foreground'>
              {format(new Date(item.dateTime), 'MMM d, yyyy')}
            </div>
            <div className='px-3 flex gap-1'>
              <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => onEdit(item)}>
                <Pencil className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='icon' className='h-8 w-8 text-destructive hover:text-destructive' onClick={() => onDelete(item.id)}>
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCards({
  items,
  onEdit,
  onDelete,
}: {
  items: ExerciseEntryDto[];
  onEdit: (item: ExerciseEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='flex flex-col gap-3'>
      {items.map((item) => (
        <div key={item.id} className='border rounded-lg p-4 space-y-2'>
          <div className='flex justify-between items-start'>
            <span className='font-semibold text-sm'>{item.exercise?.name ?? 'No exercise'}</span>
            <span className='text-xs text-muted-foreground'>
              {format(new Date(item.dateTime), 'MMM d, yyyy')}
            </span>
          </div>
          <div className='text-xs text-muted-foreground space-y-0.5'>
            <p>Duration: {item.duration} min</p>
            <p className='capitalize'>Intensity: {item.intensity.charAt(0) + item.intensity.slice(1).toLowerCase()}</p>
            {item.caloriesBurned != null && <p>Calories: {item.caloriesBurned}</p>}
            {item.notes && <p>Notes: {item.notes}</p>}
          </div>
          <div className='flex gap-2 pt-1'>
            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => onEdit(item)}>
              <Pencil className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-8 w-8 text-destructive hover:text-destructive' onClick={() => onDelete(item.id)}>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
