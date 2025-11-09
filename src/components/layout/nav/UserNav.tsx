import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvitar from '@/components/UserAvatar';
import { useAuth } from '@/hooks/useAuth';
import { authClient } from '@/lib/auth-client';
import { useRouter } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
export function UserNav() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user)
    return (
      <>
        <Button onClick={() => router.navigate({ to: '/login' })}>Login</Button>
        <Button onClick={() => router.navigate({ to: '/register' })}>
          Register
        </Button>
      </>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <UserAvitar
            displayName={user?.name}
            className='bg-blue-500 text-white cursor-pointer'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => authClient.signOut()}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
