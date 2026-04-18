'use client';

import logout from '@/actions/LogoutAction';
import { Button } from '../ui/button';

const LogoutBtn = () => {
  return (
    <Button
      variant={'ghost'}
      onClick={() => {
        logout();
      }}
      className='text-sm transition-colors hover:bg-background! hover:font-semibold! cursor-pointer'
    >
      Logout
    </Button>
  );
};
export default LogoutBtn;
