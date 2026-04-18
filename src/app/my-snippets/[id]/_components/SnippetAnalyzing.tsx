import Loader from '@/components/loader/Loader';

const SnippetAnalyzing = () => {
  return (
    <div className='w-full h-full p-4 bg-background text-foreground'>
      <div className='max-w-3xl h-5/6 mt-5 mx-auto flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-lg font-semibold'>
            Please wait while your snippet gets OhhCoded!{' '}
          </h1>
          <p className='text-sm'>
            You can revise / analyze other snippets meanwhile
          </p>
        </div>
        <Loader />
      </div>
    </div>
  );
};
export default SnippetAnalyzing;
