import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import MySnippetsClient from './_components/MySnippetsClient';
import { SearchFilter } from '@/types/searchAndFilter/SearchFilter.types';
import { getAllSnippets } from '@/actions/SnippetActions';

const MySnippetsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const filters: SearchFilter = {
    search: String(params.search ?? ''),
    status: String(params.status ?? ''),
    difficulty: String(params.difficulty ?? ''),
    tags:
      typeof params.tags === 'string'
        ? params.tags.split(',').filter(Boolean)
        : [],
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['snippets', filters],
    queryFn: () => getAllSnippets(filters),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MySnippetsClient initialFilters={filters} />
    </HydrationBoundary>
  );
};
export default MySnippetsPage;
