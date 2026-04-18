import { cookies } from 'next/headers';
import Link from 'next/link';
import ModeToggle from '../theme-toggle/ThemeToggle';
import LogoutBtn from './LogoutBtn';
import UploadSnippetDialog from '../upload-snippet/UploadSnippetDialog';

const Navbar = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('token');
  return (
    <header className='sticky top-0 z-50 border-border/80 bg-background/50 backdrop-blur-xl'>
      <div className='flex px-2 md:px-4 items-center justify-between  h-16 '>
        <div className=''>
          <Link
            href={isLoggedIn ? '/my-snippets' : '/'}
            className='text-2xl font-extrabold tracking-tight'
          >
            <span className='hidden'>OC</span>
            <span className='md:block'>OhhCode.ai</span>
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <ModeToggle />
          {isLoggedIn && (
            <div className='flex items-center space-x-4'>
              <UploadSnippetDialog />
              <LogoutBtn />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
