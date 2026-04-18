import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import difficultyOptions from '@/constants/Difficulty';
import { statusOptions } from '@/constants/Status';
import { Page } from '@/types/snippet/page.types';
import { Snippet } from '@/types/snippet/snippet.types';
import { RotateCcw, Tag } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const FilterSection = ({ snippets }: { snippets: Page<Snippet> }) => {
  const availableTags = useMemo(() => {
    if (!snippets?.content) return [];

    // 1. Flatten all tags from all snippets into one array
    const allTags = snippets.content.flatMap((snippet) => snippet.tags);

    // 2. Remove duplicates using Set and sort alphabetically
    return Array.from(new Set(allTags)).sort();
  }, [snippets.content]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeStatus = searchParams.get('status') || 'all';
  const activeDifficulty = searchParams.get('difficulty') || 'all';
  const activeTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

  const updateURL = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === 'all') params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleTag = (tag: string) => {
    const newTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];
    updateURL('tags', newTags.length ? newTags.join(',') : null);
  };

  return (
    <div className='flex-1 overflow-y-auto px-6 space-y-8 pb-10'>
      <section className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[13px] font-bold uppercase tracking-[0.2em] text-shadow-accent-foreground'>
            Status
          </h3>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {statusOptions.map((status) => (
            <Button
              variant={'ghost'}
              key={status.id}
              onClick={() => updateURL('status', status.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeStatus === status.id
                  ? 'bg-secondary text-secondary-foreground border-secondary shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-zinc-900 hover:border-primary/30 border border-transparent'
              }`}
            >
              <status.icon className='size-4.5' />
              {status.label}
            </Button>
          ))}
        </div>
      </section>
      {/* 3. DIFFICULTY (Gradient Border Style) */}
      <section className='space-y-3'>
        <h3 className='text-[13px] font-bold uppercase tracking-[0.2em] text-shadow-accent-foreground'>
          difficulty
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          {difficultyOptions.map((difficulty) => {
            const isSelected = activeDifficulty === difficulty.id;
            const Icon = difficulty.icon;

            return (
              <Button
                variant={'ghost'}
                key={difficulty.id}
                onClick={() => updateURL('difficulty', difficulty.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-secondary text-secondary-foreground border-secondary shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-zinc-900 hover:border-primary/30 border border-transparent'
                }`}
              >
                <Icon
                  className={`size-4.5 ${isSelected ? `animate-pulse ${difficulty.color}` : 'opacity-100 group-hover:opacity-100'}`}
                />
                {difficulty.label}
              </Button>
            );
          })}
        </div>
      </section>
      {/* 4. TAGS (The "Cloud" Design) */}
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[13px] font-bold uppercase tracking-[0.2em] text-shadow-accent-foreground flex items-center gap-2'>
            <Tag className='w-3 h-3' /> Active Tags
          </h3>
          <span className='text-[10px] font-medium px-2 py-0.5 rounded-mdll bg-secondary text-secondary-foreground'>
            {availableTags.length}
          </span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {availableTags.length > 0 ? (
            availableTags.map((tag) => {
              const isSelected = activeTags.includes(tag.toLowerCase());
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => toggleTag(tag.toLowerCase())}
                  className={`cursor-pointer px-3 py-1 rounded-md border-none text-[11px] transition-all hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'bg-secondary shadow-md shadow-indigo-500/20'
                      : 'bg-white dark:bg-zinc-900 text-muted-foreground hover:text-primary hover:border-primary/30 border border-transparent'
                  }`}
                >
                  {tag}
                </Badge>
              );
            })
          ) : (
            <p className='text-[10px] text-sm italic'>
              No tags found in this view
            </p>
          )}
        </div>
      </section>
      <div className='bg-white/50 dark:bg-zinc-900/50 mt-auto'>
        <Button
          variant='ghost'
          onClick={() => router.push(pathname)}
          className='w-full justify-center gap-2  hover:text-destructive hover:bg-destructive/5 rounded-md transition-all'
        >
          <RotateCcw className='w-4 h-4' />
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};
export default FilterSection;
