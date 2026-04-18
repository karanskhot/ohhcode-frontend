import { snippetService } from '@/services/snippet-service';
import { Snippet } from '@/types/snippet/snippet.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NProgress from 'nprogress';

export const useSnippet = (snippetId: string) => {
  return useQuery<Snippet>({
    queryKey: ['snippet', snippetId],
    queryFn: () => snippetService.getSnippet(snippetId),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return;
      if (data.status === 'ANALYZING') return 5000;
      return false;
    },
    refetchIntervalInBackground: true,
  });
};

export const useCreateAnalysis = (snippetId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: snippetService.createAnalysis,
    onMutate: () => {
      NProgress.start(); // Start bar when button is clicked
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] });
    },
    onSettled: () => {
      NProgress.done(); // Stop bar whether it failed or succeeded
    },
  });
};
