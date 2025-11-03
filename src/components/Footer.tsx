import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className='h-40 border-t-2 border-gray-100 dark:border-gray-900'>
      <div className='container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm'>
        <div className='font-semibold text-lg  flex flex-col gap-2'>
          <div>IanFrye</div>
          <a
            href='mailto:ianfrye.dev@gmail.com'
            className='hover:underline'
          >
            ianfrye.dev@gmail.com
          </a>
        </div>
        <nav className='flex flex-wrap gap-4 items-center'>
          <Link
            to='/privacy-policy'
            className='hover:underline'
          >
            Privacy Policy
          </Link>
          <Link
            to='/terms-of-service'
            className='hover:underline'
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
