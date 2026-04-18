import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchCodeIcon, X } from 'lucide-react';

const SearchSnippet = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set('search', value);
    else params.delete('search');
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const resetSearch = () => {
    router.replace(pathname);
    setSearchValue('');
  };
  return (
    <div className='p-4 shrink-0 bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'>
      <div className='flex  justify-between items-center h-12 border border-secondary focus-visible:ring-0'>
        <div className='px-4 flex items-center gap-2 w-full'>
          <SearchCodeIcon className='text-primary' />
          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder='Search snippets...'
            className='text-[15px]!  border-0 bg-transparent! focus-visible:ring-0 rounded-none ring-0 h-10 w-full'
          />
        </div>
        {searchValue && (
          <Button
            variant={'ghost'}
            className='h-full! ring-0'
            onClick={resetSearch}
          >
            <X className='text-destructive' />
          </Button>
        )}
      </div>
    </div>
  );
};
export default SearchSnippet;
