'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';
import { useDeleteAccount } from '@/features/accounts/api/useDeleteAccount';
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
  const { onOpen } = useOpenAccount();
  const deleteMutation = useDeleteAccount(id);
  const [ConfirmationDialog, confirm] = useConfirm(
    'Delete Account',
    'Are you sure you want to delete this account?'
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
