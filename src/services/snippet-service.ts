import {
  UpdateSnippetRequest,
  UploadSnippetRequest,
} from '@/schemas/snippet/SnippetSchema';
import {
  Snippet,
  SnippetAnalysisInput,
  SnippetCreateResponse,
} from '@/types/snippet/snippet.types';

export const snippetService = {
  uploadSnippet: async (
    payload: UploadSnippetRequest,
  ): Promise<SnippetCreateResponse> => {
    const formData = new FormData();
    formData.append('title', generateTitle());
    if (payload.snippetImage) {
      formData.append('snippetImage', payload.snippetImage);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/snippets`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create snippet');
    }
    return await response.json();
  },
  getSnippet: async (snippetId: string): Promise<Snippet> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/snippets/${snippetId}`,
      {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create snippet');
    }
    return await response.json();
  },
  createAnalysis: async ({
    snippetId,
    payload,
  }: {
    snippetId: string;
    payload: SnippetAnalysisInput;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/snippets/${snippetId}/analyze`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create snippet analysis');
    }
    const resp = await response.json();
    console.log(resp);
    return await resp;
  },
  updateSnippet: async ({
    payload,
    snippetId,
  }: {
    payload: UpdateSnippetRequest;
    snippetId: string;
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/snippets/${snippetId}`,
      {
        method: 'PATCH',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payload),
        credentials: 'include',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create snippet');
    }
    return await response.json();
  },
};

const generateTitle = () => {
  const now = new Date();

  const timestamp = now
    .toISOString()
    .replace(/[-:.TZ]/g, '')
    .slice(0, 14);

  return `snippet_${timestamp}`;
};
