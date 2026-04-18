import { Page } from '@/types/snippet/page.types';
import { Snippet } from '@/types/snippet/snippet.types';
import UserSection from './UserSection';
import FilterSection from './FilterSection';

const UserAndFilterPanel = ({ snippets }: { snippets: Page<Snippet> }) => {
  return (
    <div className='flex h-full flex-col bg-slate-50/50 dark:bg-zinc-950/50 backdrop-blur-md'>
      <UserSection />
      <FilterSection snippets={snippets} />
    </div>
  );
};
export default UserAndFilterPanel;
