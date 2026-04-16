'use client';

import { Input } from '@/components/ui/input';
import { LoginInputType, LoginSchema } from '@/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <div className='mt-4'>
      <h1 className='text-3xl text-center font-extrabold tracking-tight'>
        print(&quot;Hello Again!&quot;)
      </h1>

      <form className='max-w-lg mx-auto flex flex-col space-y-8 mt-10'>
        <div
          className={`flex items-center border border-secondary bg-background transition-colors 
      ${errors.username ? 'border-destructive' : 'border-accent'} 
      focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
        >
          <Input
            id='username'
            autoComplete='off'
            type='email'
            placeholder='abc@def.com'
            {...register('username')}
            required
            className='border-accent focus-visible:ring-0 rounded-none ring-0 focus-visible:ring-offset-0 bg-transparent h-10 w-full'
          />
        </div>
        <div
          className={`flex items-center border border-secondary bg-background transition-colors 
                    ${errors.password ? 'border-destructive' : 'border-accent'} 
                        focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
        >
          <Input
            id='password'
            // type={showPassword ? 'text' : 'password'}
            type='password'
            placeholder='••••••••'
            {...register('password')}
            className='focus-visible:ring-0 rounded-none ring-0 focus-visible:ring-offset-0 bg-transparent h-10 w-full'
          />
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
