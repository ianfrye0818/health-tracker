import { ArrayDataWrapper } from '@/components/DataWrapper';
import { WeightForm } from '@/components/forms/WeightForm';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  useGetUsersWeightEntries,
  useCreateWeightEntry,
  useUpdateWeightEntry,
  useRemoveWeightEntry,
} from '@/features/weightEntries/hooks/useWeightEntries';
import { WeightEntryDto } from '@/lib/dtos';
import { CreateWeightEntryInput } from '@/lib/schemas';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/(root)/weight/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useGetUsersWeightEntries();
  const createMutation = useCreateWeightEntry();
  const updateMutation = useUpdateWeightEntry();
  const deleteMutation = useRemoveWeightEntry();
  const { isMobile } = useMediaQuery();

  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WeightEntryDto | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSubmit = (formData: CreateWeightEntryInput) => {
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

  const openEdit = (entry: WeightEntryDto) => {
    setEditingEntry(entry);
    setFormOpen(true);
  };

  return (
    <div className='px-4 py-6'>
      <Card>
        <CardHeader>
          <CardTitle>Weight</CardTitle>
          <CardAction>
            <Button onClick={openCreate}>+ Add</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ArrayDataWrapper
            data={data}
            isLoading={isLoading}
            error={error}
            emptyMessage='No weight entries yet.'
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

      <WeightForm
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
        description='Are you sure you want to delete this weight entry?'
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
  items: WeightEntryDto[];
  onEdit: (item: WeightEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='overflow-x-auto'>
      <div className='grid grid-cols-[1fr_2fr_auto] gap-x-4 min-w-[480px]'>
        <div className='grid grid-cols-subgrid col-span-full text-xs font-medium text-muted-foreground uppercase bg-muted/50 rounded-t-lg'>
          <div className='px-3 py-2'>Weight</div>
          <div className='px-3 py-2'>Date</div>
          <div className='px-3 py-2'></div>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-subgrid col-span-full items-center border-t py-2.5 text-sm'
          >
            <div className='px-3 font-medium'>{item.weight} lbs</div>
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
  items: WeightEntryDto[];
  onEdit: (item: WeightEntryDto) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='flex flex-col gap-3'>
      {items.map((item) => (
        <div key={item.id} className='border rounded-lg p-4 space-y-2'>
          <div className='flex justify-between items-start'>
            <span className='font-semibold text-sm'>{item.weight} lbs</span>
            <span className='text-xs text-muted-foreground'>
              {format(new Date(item.date), 'MMM d, yyyy')}
            </span>
          </div>
          {item.notes && (
            <p className='text-xs text-muted-foreground'>Notes: {item.notes}</p>
          )}
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
