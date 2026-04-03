'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const filterTag = tag === 'all' || !tag ? undefined : (tag as NoteTag);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', filterTag],
    queryFn: () => fetchNotes({ tag: filterTag, page: 1 }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <NoteList notes={data?.notes ?? []} />;
}
