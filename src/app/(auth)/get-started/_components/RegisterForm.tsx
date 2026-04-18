'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  RegisterRequestType,
  RegisterSchema,
} from '@/schemas/auth/RegisterSchema';
import { authService } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequestType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      role: 'ROLE_USER',
    },
    mode: 'onSubmit',
  });

  const handleRegister = async (payload: RegisterRequestType) => {
    const { message, username } = await authService.register(payload);
    if (!username || username === '') {
      toast.error(message);
    } else {
      toast.success(message + ' you can login now! ');
      router.refresh();
      reset();
    }
  };
  return (
    <div className='mt-4'>
      <h1 className='text-3xl text-center font-extrabold tracking-wider'>
        Register
      </h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='max-w-lg mx-auto flex flex-col'
        autoComplete='none'
      >
        <div className='mt-10 flex flex-col space-y-4'>
          <FieldSet className='grid gap-4 grid-cols-1 md:grid-cols-2'>
            <FieldGroup>
              <Field>
                <FieldLabel
                  className='text-[14px] font-semibold'
                  htmlFor='firstName'
                >
                  First
                </FieldLabel>
                <div
                  className={`flex items-center border border-secondary bg-background! transition-colors ${errors.firstName ? 'border-destructive' : 'border-accent'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
                >
                  <Input
                    id='firstName'
                    autoComplete='off'
                    placeholder='John'
                    {...register('firstName')}
                    className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                  />
                </div>
                <FieldError>{errors.firstName?.message}</FieldError>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel
                  className='text-[14px] font-semibold'
                  htmlFor='lastName'
                >
                  Last
                </FieldLabel>
                <div
                  className={`flex items-center border border-secondary bg-background! transition-colors ${errors.lastName ? 'border-destructive' : 'border-accent'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
                >
                  <Input
                    id='lastName'
                    autoComplete='off'
                    placeholder='Doe'
                    {...register('lastName')}
                    className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                  />
                </div>
                <FieldError>{errors.lastName?.message}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet className='grid gap-4 grid-cols-1'>
            <FieldGroup>
              <Field>
                <FieldLabel
                  className='text-[14px] font-semibold'
                  htmlFor='username'
                >
                  Email
                </FieldLabel>
                <div
                  className={`flex items-center border border-secondary bg-background! transition-colors ${errors.username ? 'border-destructive' : 'border-accent'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
                >
                  <Input
                    id='username'
                    autoComplete='off'
                    placeholder='jonhdoe@gmail.com'
                    {...register('username')}
                    className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                  />
                </div>
                <FieldDescription>This will be your username.</FieldDescription>
                <FieldError>{errors.username?.message}</FieldError>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel
                  className='text-[14px] font-semibold'
                  htmlFor='password'
                >
                  Password
                </FieldLabel>
                <div
                  className={`flex items-center border border-secondary bg-background! transition-colors ${errors.password ? 'border-destructive' : 'border-accent'} focus-within:ring-1 focus-within:ring-ring focus-within:border-secondary`}
                >
                  <Input
                    id='password'
                    autoComplete='off'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='**********'
                    {...register('password')}
                    className='text-[15px]!  border-0 bg-background!  focus-visible:ring-0 rounded-none ring-0  h-10 w-full'
                  />
                  <div className='px-3 cursor-pointer'>
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
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>
          <div className='w-full flex justify-end'>
            <Button className='h-12!' disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : 'Join OhhCode.ai'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
