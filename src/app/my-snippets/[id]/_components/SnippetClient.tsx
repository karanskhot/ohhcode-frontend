'use client';

import Loader from '@/components/loader/Loader';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useSnippet } from '@/hooks/use-snippet';
import SnippetDetails from './SnippetDetails';
import CreateAnalyze from './CreateAnalyze';
import RenderSnippetByStatus from './RenderSnippetByStatus';

const SnippetClient = ({ snippetId }: { snippetId: string }) => {
  const { data: snippet, isLoading } = useSnippet(snippetId);
  if (isLoading || !snippet) return <Loader />;

  return (
    <div className='h-[calc(100dvh-10rem)] hidden lg:block mt-4'>
      <ResizablePanelGroup orientation='horizontal' className='h-full'>
        <ResizablePanel minSize={'40%'} defaultSize={'50%'}>
          <SnippetDetails snippet={snippet} />
        </ResizablePanel>
        <ResizableHandle withHandle className='' />
        <ResizablePanel defaultSize={'60%'} minSize={'50%'}>
          <CreateAnalyze snippetId={snippetId} snippet={snippet} />
          <RenderSnippetByStatus
            snippet={snippet!}
            snippetId={snippetId}
            status={snippet.status}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default SnippetClient;
