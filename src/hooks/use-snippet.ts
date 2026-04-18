import { snippetService } from '@/services/snippet-service';
import { Snippet } from '@/types/snippet/snippet.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippet', snippetId] });
    },
  });
};
