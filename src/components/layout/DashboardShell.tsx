import { ModeToggle } from '@/components/ModeToggle';
import type React from 'react';
import { MainNav } from './nav/MainNav';
import { UserNav } from './nav/UserNav';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <header className='sticky top-0 z-40 border-b bg-background h-16'>
          <div className='w-10/12 mx-auto flex h-16 items-center justify-between py-4 px-2 md:px-4 lg:px-6'>
            <MainNav />
            <div className='flex items-center gap-4'>
              <ModeToggle side='bottom' align='start' offset={10} />
              <UserNav />
            </div>
          </div>
        </header>
        <main className='w-full max-w-[95vw] mx-auto pb-20'>{children}</main>
      </div>
    </>
  );
}
