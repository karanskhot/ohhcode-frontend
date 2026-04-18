'use server';

import { cookies } from 'next/headers';
import { SearchFilter } from '@/types/searchAndFilter/SearchFilter.types';
import { Page } from '@/types/snippet/page.types';
import { Snippet } from '@/types/snippet/snippet.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getAuthToken() {
  return (await cookies()).get('token')?.value;
}

export const getAllSnippets = async (
  filters: SearchFilter,
): Promise<Page<Snippet>> => {
  const token = await getAuthToken();
  const { search, status, tags, difficulty } = filters;

  const query = new URLSearchParams({
    search,
    status,
    difficulty,
    tags: tags.join(','),
  }).toString();

  const response = await fetch(`${BASE_URL}/snippets?${query}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Cookie: `token=${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Failed to fetch snippets');
  return response.json();
};

export const deleteSnippet = async (snippetId: string) => {
  const token = await getAuthToken();
  const resp = await fetch(`${BASE_URL}/snippets/${snippetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  });
  return resp.status;
};
