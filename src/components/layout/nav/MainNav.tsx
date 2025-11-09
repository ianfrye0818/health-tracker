import { useAuth } from '@/hooks/useAuth';
  

export function MainNav() {
    const { user } = useAuth();
    return (
      <>
        <nav className='hidden xl:flex items-center space-x-4 lg:space-x-6'>
            {/* LOGO */}
  
          {/* Nav Links */}
        </nav>
      </>
    );
  }