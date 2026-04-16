import AuthLeft from './_components/AuthLeft';
import AuthRight from './_components/AuthRight';

const GetStartedPage = () => {
  return (
    <div className='h-[calc(100dvh-15rem)] flex items-start justify-center py-20'>
      <div className='container grid lg:grid-cols-2 gap-20 items-start h-full'>
        <AuthLeft />
        <AuthRight />
      </div>
    </div>
  );
};
export default GetStartedPage;
