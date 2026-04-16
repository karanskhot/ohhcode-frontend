import { cookies } from 'next/headers';
import Link from 'next/link';
import ModeToggle from '../theme-toggle/ThemeToggle';

const Navbar = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('token');
  return (
    <header className='sticky top-0 z-50 border-b border-border/80 bg-background/50 backdrop-blur-xl'>
      <div className='flex px-2 md:px-4 items-center justify-between  h-16 '>
        <div className=''>
          <Link href={isLoggedIn ? '/my-snippets' : '/'}>
            <h1 className='text-4xl font-medium tracking-tight text-secondary'>
              OhhCode.
            </h1>
          </Link>
        </div>
        <div className=''>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
