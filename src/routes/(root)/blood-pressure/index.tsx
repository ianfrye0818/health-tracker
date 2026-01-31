import { ArrayDataWrapper } from '@/components/DataWrapper';
import { BloodPressureForm } from '@/components/forms/BloodPressureForm';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  useGetUsersBloodPressureEntries,
  useCreateBloodPressureEntry,
  useUpdateBloodPressureEntry,
  useDeleteBloodPressureEntry,
} from '@/features/bloodPressureEntries/hooks/useBloodPressureEntries';
import { BloodPressureEntryDto } from '@/lib/dtos';
import { CreateBloodPressureInput } from '@/lib/schemas';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/(root)/blood-pressure/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useGetUsersBloodPressureEntries();
  const createMutation = useCreateBloodPressureEntry();
  const updateMutation = useUpdateBloodPressureEntry();
  const deleteMutation = useDeleteBloodPressureEntry();
  const { isMobile } = useMediaQuery();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BloodPressureEntryDto | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSubmit = (formData: CreateBloodPressureInput) => {
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

  const openEdit = (entry: BloodPressureEntryDto) => {
    setEditingEntry(entry);
    setFormOpen(true);
  };

  return (
    <div className='px-4 py-6'>
      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure</CardTitle>
          <CardAction>
            <Button onClick={openCreate}>+ Add</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ArrayDataWrapper
            data={data}
            isLoading={isLoading}
            error={error}
            emptyMessage='No blood pressure entries yet.'
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

      <BloodPressureForm
        open={formOpen}
        setOpen={setFormOpen}
        mode={editingEntry ? 'edit' : 'create'}
        defaultValues={editingEntry ?? undefined}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        open={deleteId !== null}
        setOpen={(open) => !open && setDeleteId(null)}
        title='Delete Entry'
        description='Are you sure you want to delete this blood pressure entry?'
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
  items: BloodPressureEntryDto[];
  onEdit: (item: BloodPressureEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='overflow-x-auto'>
      <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_auto] gap-x-4 min-w-[640px]'>
        <div className='grid grid-cols-subgrid col-span-full text-xs font-medium text-muted-foreground uppercase bg-muted/50 rounded-t-lg'>
          <div className='px-3 py-2'>Systolic / Diastolic</div>
          <div className='px-3 py-2'>Pulse</div>
          <div className='px-3 py-2'>O₂ Sat</div>
          <div className='px-3 py-2'>Position</div>
          <div className='px-3 py-2'>Date</div>
          <div className='px-3 py-2'></div>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-subgrid col-span-full items-center border-t py-2.5 text-sm'
          >
            <div className='px-3 font-medium'>
              {item.systolic} / {item.diastolic}
            </div>
            <div className='px-3 text-muted-foreground'>{item.pulse ?? '—'}</div>
            <div className='px-3 text-muted-foreground'>
              {item.oxygenSaturation != null ? `${item.oxygenSaturation}%` : '—'}
            </div>
            <div className='px-3 text-muted-foreground capitalize'>
              {item.position.charAt(0) + item.position.slice(1).toLowerCase()}
            </div>
            <div className='px-3 text-muted-foreground'>
              {format(new Date(item.date), 'MMM d, yyyy')}
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
  items: BloodPressureEntryDto[];
  onEdit: (item: BloodPressureEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='flex flex-col gap-3'>
      {items.map((item) => (
        <div key={item.id} className='border rounded-lg p-4 space-y-2'>
          <div className='flex justify-between items-start'>
            <span className='font-semibold text-sm'>
              {item.systolic} / {item.diastolic}
            </span>
            <span className='text-xs text-muted-foreground'>
              {format(new Date(item.date), 'MMM d, yyyy')}
            </span>
          </div>
          <div className='text-xs text-muted-foreground space-y-0.5'>
            {item.pulse != null && <p>Pulse: {item.pulse}</p>}
            {item.oxygenSaturation != null && <p>O₂ Sat: {item.oxygenSaturation}%</p>}
            <p className='capitalize'>Position: {item.position.charAt(0) + item.position.slice(1).toLowerCase()}</p>
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
