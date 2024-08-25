'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useOpenTransaction } from '@/features/transactions/hooks/useOpenTransaction';
import { useDeleteTransaction } from '@/features/transactions/api/useDeleteTransaction';
import { useConfirm } from '@/hooks/useConfirm';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenTransaction();
  const deleteMutation = useDeleteTransaction(id);
  const [ConfirmationDialog, confirm] = useConfirm(
    'Delete Transaction',
    'Are you sure you want to delete this transaction?'
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) deleteMutation.mutate(undefined, { onSuccess: () => {} });
  };

  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
