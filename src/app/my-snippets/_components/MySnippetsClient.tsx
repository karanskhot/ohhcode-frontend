'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFilter } from '@/types/searchAndFilter/SearchFilter.types';
import { useQuery } from '@tanstack/react-query';
import SearchSnippet from './SearchSnippet';
import SnippetItem from './SnippetItem';
import { useState } from 'react';
import NoSnippetsFound from './NoSnippetsFound';
import SnippetPreviewSection from './SnippetPreviewSection';
import { getAllSnippets } from '@/actions/SnippetActions';
import UserAndFilterPanel from './UserAndFilterPanel/UserAndFilterPanel';

const MySnippetsClient = ({
  initialFilters,
}: {
  initialFilters: SearchFilter;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['snippets', initialFilters],
    queryFn: () => getAllSnippets(initialFilters),
    initialData: undefined,
  });

  const selectedSnippet = data?.content.find((s) => s.id === selectedId);
  return (
    <div className='h-[calc(100dvh-6rem)] hidden lg:block bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'>
      <ResizablePanelGroup>
        {/* LEFT */}
        <ResizablePanel defaultSize={'25%'} minSize={'20%'} maxSize={'30%'}>
          <UserAndFilterPanel snippets={data!} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* CENTER */}

        <ResizablePanel
          defaultSize={'30%'}
          minSize={'40%'}
          maxSize={'40%'}
          className='bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'
        >
          <Tabs
            defaultValue='all'
            className='h-full flex flex-col rounded-none'
          >
            <div className='h-14 flex items-center justify-between px-4 border-b shrink-0 p-2 '>
              <h1 className='text-2xl font-semibold tracking-tight'>
                My Snippets
              </h1>

              <TabsList className='bg-background p-0  rounded-none'>
                <TabsTrigger
                  value='all'
                  className='rounded-sm text-base font-semibold data-[state=active]:bg-secondary data-[state=active]:text-popover transition-all'
                >
                  All Snippets
                </TabsTrigger>
                <TabsTrigger
                  value='revise'
                  className='rounded-sm text-base font-semibold data-[state=active]:bg-secondary data-[state=active]:text-popover transition-all'
                >
                  Revision Mode
                </TabsTrigger>
              </TabsList>
            </div>
            <SearchSnippet />
            <div className='flex-1 overflow-y-auto'>
              <TabsContent value='all' className='p-4 space-y-3'>
                {data?.content.length ? (
                  data.content.map((snippet, index) => (
                    <SnippetItem
                      key={snippet.id}
                      snippet={snippet}
                      index={index + 1}
                      isSelected={selectedId === snippet.id}
                      onSelect={() => setSelectedId(snippet.id)}
                    />
                  ))
                ) : (
                  <NoSnippetsFound />
                )}
              </TabsContent>
              <TabsContent value='revise' className='p-4 space-y-3'>
                {data?.content.filter((snippet) => snippet.important).length ? (
                  data?.content
                    .filter((snippet) => snippet.important)
                    ?.map((revise, index) => (
                      <SnippetItem
                        key={revise.id}
                        snippet={revise}
                        index={index + 1}
                        isSelected={selectedId === revise.id}
                        onSelect={() => setSelectedId(revise.id)}
                      />
                    ))
                ) : (
                  <NoSnippetsFound />
                )}
              </TabsContent>
            </div>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT */}
        <ResizablePanel
          defaultSize={'40%'}
          minSize={'30%'}
          maxSize={'40%'}
          className='bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'
        >
          <SnippetPreviewSection snippet={selectedSnippet!} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default MySnippetsClient;
