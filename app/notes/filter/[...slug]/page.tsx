import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tag = slug?.[0];
  const filterTag = tag === 'all' || !tag ? undefined : (tag as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', filterTag, 1],
    queryFn: () => fetchNotes({ tag: filterTag, page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
