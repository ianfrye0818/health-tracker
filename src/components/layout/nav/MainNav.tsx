import { Activity, Dumbbell, Heart, LayoutDashboard, Menu, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { useLocation, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Blood Pressure', path: '/blood-pressure', icon: Heart },
  { label: 'Weight', path: '/weight', icon: TrendingDown },
  { label: 'Exercises', path: '/exercises', icon: Dumbbell },
  { label: 'Exercise Log', path: '/exercise-log', icon: Activity },
];

export function MainNav() {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className='hidden xl:flex items-center space-x-1'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <Button
        variant='ghost'
        size='icon'
        className='xl:hidden'
        onClick={() => setSheetOpen(true)}
        aria-label='Open navigation menu'
      >
        <Menu className='h-5 w-5' />
      </Button>

      {/* Mobile Sheet drawer */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className='flex flex-col gap-1 mt-4'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className='h-4 w-4' />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}