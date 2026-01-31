import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/UserAvatar';
import { useAuth, useLogoutUser } from '@/features/auth/hooks';
import { LogOut } from 'lucide-react';

export function UserNav() {
  const { user } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'
        >
          <UserAvatar
            displayName={user?.name}
            className='bg-blue-500 text-white cursor-pointer'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}