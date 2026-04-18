import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthRight = () => {
  return (
    <Tabs defaultValue='login' className='max-w-xl flex flex-col'>
      <TabsList className='grid w-full border grid-cols-2 h-11! rounded-sm'>
        <TabsTrigger
          value='login'
          className='rounded-sm font-semibold data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all'
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value='register'
          className='rounded-sm font-semibold data-[state=active]:bg-secondary data-[state=active]:text-primary-foreground transition-all'
        >
          Register
        </TabsTrigger>
      </TabsList>
      <div className='border rounded-xl bg-input p-10'>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default AuthRight;
