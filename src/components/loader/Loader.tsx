import { RiseLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='h-[calc(100dvh-10rem)] flex items-center justify-center'>
      <RiseLoader size={30} color='var(--primary)' />
    </div>
  );
};
export default Loader;
