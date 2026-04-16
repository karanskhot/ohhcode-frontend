import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';

const AuthRight = () => {
  return (
    <Tabs defaultValue='login' className='max-w-xl'>
      <TabsList className='grid w-full border grid-cols-2 h-11! rounded-sm'>
        <TabsTrigger
          value='login'
          className='rounded-sm font-semibold data-[state=active]:bg-secondary data-[state=active]:text-accent transition-all'
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value='register'
          className='rounded-sm font-semibold data-[state=active]:bg-secondary data-[state=active]:text-accent transition-all'
        >
          Register
        </TabsTrigger>
      </TabsList>
      <div className='min-h-137 border rounded-xl'>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <p>RegisterForm</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default AuthRight;
