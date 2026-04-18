import { Badge } from '@/components/ui/badge';
import { statusMap } from '@/constants/Status';
import { Snippet } from '@/types/snippet/snippet.types';
import { Zap } from 'lucide-react';

const SnippetItem = ({
  snippet,
  index,
  isSelected,
  onSelect,
}: {
  snippet: Snippet;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const status = statusMap[snippet.status];
  return (
    <div
      onClick={onSelect}
      className={`min-h-24 max-w-full mx-auto  shadow-sm group  border transition-all cursor-pointer p-3  ${
        isSelected
          ? 'bg-foreground/20'
          : 'hover:bg-foreground/10 bg-white dark:bg-zinc-900'
      }`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex gap-1 items-center'>
          <p className='text-3xl text-muted-foreground font-extrabold'>
            {index}.
          </p>
          <p className='text-shadow-secondary-foreground font-semibold text-xl'>
            {snippet.title}
          </p>
        </div>
        <span>
          {status?.icon && (
            <status.icon
              className={`size-5 ${status.label === 'Analyzing' ? 'animate-spin' : ''}`}
            />
          )}
        </span>
      </div>
      <div className='space-y-3 flex flex-col gap-4'>
        {snippet.tags.length > 0 && (
          <div className='flex gap-2 mt-2'>
            {snippet.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
        {snippet.status === 'ANALYZED' && (
          <div className='text-base font-semibold flex items-center gap-1'>
            {(() => {
              const lastSummary = snippet.analysis?.recall.summary.at(-1);
              if (!lastSummary) return null;
              return (
                <div className='flex items-center gap-1'>
                  <Zap className='text-primary' size={18} />
                  <span className='text-accent-foreground'>{lastSummary}</span>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
export default SnippetItem;
