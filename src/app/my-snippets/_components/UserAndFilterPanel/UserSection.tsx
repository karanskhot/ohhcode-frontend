import { authService } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const UserSection = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.currentUser,
    retry: false,
  });
  if (isError) {
    router.push('/');
    return null;
  }

  if (isLoading) <div className='p-6 text-sm'>Loading...</div>;

  return (
    <div className='p-6'>
      <div className='flex items-center gap-4 p-3 rounded-md bg-white dark:bg-zinc-900 border shadow-sm group hover:border-primary/50 transition-all cursor-pointer'>
        <div className='h-12 w-12 rounded-md bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg'>
          {data?.firstName?.[0] || 'U'}
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-sm tracking-tight'>
            {data?.firstName}
          </span>
          <span>Ready to revise?</span>
        </div>
      </div>
    </div>
  );
};
export default UserSection;
