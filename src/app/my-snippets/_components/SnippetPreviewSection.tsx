import { deleteSnippet } from '@/actions/SnippetActions';
import { Button } from '@/components/ui/button';
import { Snippet } from '@/types/snippet/snippet.types';
import { Lightbulb, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SnippetPreviewSection = ({ snippet }: { snippet: Snippet }) => {
  const router = useRouter();

  if (!snippet)
    return (
      <div className='flex h-full items-center justify-center text-base text-muted-foreground'>
        No snippet selected.
      </div>
    );
  return (
    <div className='h-full flex flex-col bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'>
      <div className='h-14 border-b flex justify-between px-6 items-center shrink-0'>
        <div className='flex items-center justify-between w-full gap-3'>
          <h2 className='font-semibold text-lg tracking-tight'>
            {snippet.title}
          </h2>
          <form
            action={async () => {
              const status = await deleteSnippet(snippet.id);
              if (status === 204) toast.info('Snippet deleted successfully.');
              router.refresh();
            }}
          >
            <Button
              variant={'destructive'}
              className='hover:bg-background! bg-background! cursor-pointer'
            >
              <Trash2Icon className='size-5' />
            </Button>
          </form>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className='flex-1 overflow-y-auto p-6 max-w-5xl'>
        <Link
          href={`my-snippets/${snippet.id}`}
          className='rounded-md border shadow-2xl shadow-foreground/5 overflow-hidden flex flex-col'
        >
          {/* IMAGE SECTION */}
          <div
            className={`relative ${snippet.analysis ? 'h-110' : 'h-130'} bg-muted w-full overflow-hidden`}
          >
            <div className='relative h-full w-full  overflow-hidden shadow-inner'>
              <Image
                src={snippet.url}
                alt={snippet.title}
                fill
                priority
                sizes='full'
                className='object-contain bg-background/50'
              />
            </div>
          </div>

          {snippet.status === 'ANALYZED' &&
            snippet.analysis?.recall.recognitionSignals && (
              <div className='bg-secondary/10 p-4'>
                <div className='flex items-center gap-1 mb-5 text-primary'>
                  <Lightbulb className='w-5 h-5 animate-pulse' />
                  <span className='font-bold text-lg uppercase tracking-widest'>
                    Quick Recall
                  </span>
                </div>
                <div className='border bg-background/40! p-4 rounded-2xl'>
                  {snippet.analysis?.recall.recognitionSignals.map(
                    (signal, idx) => (
                      <div className='flex gap-3 space-y-4' key={signal}>
                        <span>{idx + 1}.</span>
                        <p className='capitalize'>{signal}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
        </Link>
      </div>
    </div>
  );
};
export default SnippetPreviewSection;
