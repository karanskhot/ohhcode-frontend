import { Snippet } from '@/types/snippet/snippet.types';
import SnippetAnalysisPanel from './SnippetAnalysisPanel';
import Loader from '@/components/loader/Loader';
import { FileWarning } from 'lucide-react';

const RenderSnippetByStatus = ({
  snippet,
  status,
}: {
  snippet: Snippet;
  snippetId: string;
  status: string;
}) => {
  return (
    <>
      {status === 'ANALYZED' ? (
        <SnippetAnalysisPanel analysis={snippet.analysis!} />
      ) : (
        renderSnippetStatus(status)
      )}
    </>
  );
};
export default RenderSnippetByStatus;

const renderSnippetStatus = (status: string) => {
  return (
    <div className='w-full h-3/4 p-4 bg-background text-foreground'>
      {status === 'UPLOADED' && (
        <div className='max-w-2xl mx-auto mt-10 rounded-xl border bg-muted/30 p-6 text-center space-y-4'>
          <h1 className='text-lg font-semibold'>
            Snippet uploaded successfully 🎉
          </h1>

          <p className='text-base text-muted-foreground'>
            Ready to turn this into a recallable solution?
          </p>

          <div className='text-base text-muted-foreground space-y-1 flex flex-col items-start justify-start w-full'>
            <p>Choose your preferred language</p>
            <p>Start analysis</p>
            <p>OhhCode will generate a structured recall for you</p>
          </div>

          <div className='text-sm text-muted-foreground mt-4'>
            You can explore other snippets while we process this. Your analysis
            will appear here once ready.
          </div>
        </div>
      )}
      {status === 'ANALYZING' && (
        <div className='w-full h-full p-4 bg-background text-foreground'>
          <div className='max-w-3xl h-5/6 mt-5 mx-auto flex flex-col items-center justify-center'>
            <div className='flex flex-col'>
              <h1 className='text-lg font-semibold'>
                Please wait while your snippet gets OhhCoded!
              </h1>
              <p className='text-sm'>
                You can revise / analyze other snippets meanwhile
              </p>
            </div>
            <Loader />
          </div>
        </div>
      )}
      {status === 'FAILED' && (
        <div className='max-w-2xl mx-auto mt-10 rounded-xl border border-destructive bg-muted/30 p-6 text-center space-y-4'>
          <h1 className='text-lg font-semibold'>
            Snippet analysis failed <FileWarning />
          </h1>

          <p className='text-base text-muted-foreground'>
            Before re-creating recallable solution?
          </p>

          <div className='text-base text-muted-foreground space-y-1 flex flex-col items-start justify-start w-full'>
            <p>Ensure the code snippet contains DSA</p>
            <p>Then start analysis</p>
            <p>OhhCode will generate a structured recall for you</p>
          </div>

          <div className='text-sm text-muted-foreground mt-4'>
            You can explore other snippets while we process this. Your analysis
            will appear here once ready.
          </div>
        </div>
      )}
    </div>
  );
};
