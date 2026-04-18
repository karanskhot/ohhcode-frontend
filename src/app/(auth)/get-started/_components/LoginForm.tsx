'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoginRequestType, LoginSchema } from '@/schemas/auth/LoginSchema';
import { authService } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const handleLogin = async (payload: LoginRequestType) => {
    console.log(payload);
    try {
      await authService.login(payload);
      toast.success('Logged in successfully.');
      reset();
      router.refresh();
    } catch (err: unknown) {
      let errorMessage = 'Invalid username or password';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError('root', { message: errorMessage });
    }
  };
  return (
    <div className='mt-4'>
      <h1 className='text-3xl text-center font-extrabold tracking-wider'>
        Hello Again!
      </h1>

      <form
        className='max-w-lg mx-auto flex flex-col'
        onSubmit={handleSubmit(handleLogin)}
      >
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel
                className='text-[14px] font-semibold'
                htmlFor='username'
              >
                Email
              </FieldLabel>
              <div
                className={`flex items-center border border-secondary bg-background transition-colors ${errors.username ? 'border-destructive' : 'border-accent'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
              >
                <Input
                  id='username'
                  autoComplete='off'
                  type='email'
                  placeholder='abc@def.com'
                  {...register('username')}
                  className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                />
              </div>
            </Field>

            <Field>
              <FieldLabel
                className='text-[14px] font-semibold'
                htmlFor='password'
              >
                Password
              </FieldLabel>
              <div
                className={`flex items-center border border-secondary bg-background transition-colors ${errors.password ? 'border-destructive' : 'border-secondary'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
              >
                <Input
                  id='password'
                  autoComplete='off'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='**********'
                  {...register('password')}
                  className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                />
                <div className='px-3 cursor-pointer bg-background!'>
                  {showPassword ? (
                    <Eye size={18} onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeClosed
                      size={18}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
            </Field>
            {errors.root && (
              <p className='text-sm text-destructive font-medium mb-4 text-center'>
                {errors.root.message}
              </p>
            )}
            <div className='flex justify-end items-center gap-6'>
              <Button
                onClick={() => reset()}
                variant='outline'
                type={'button'}
                disabled={isSubmitting}
                className='py-4 h-12 w-1/4 border-secondary!'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='py-4 h-12 w-1/2 border-primary!'
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                )}
                {isSubmitting ? 'Authenticating...' : 'Login'}
              </Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
export default LoginForm;
