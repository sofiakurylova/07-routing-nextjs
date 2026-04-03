import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';
import css from './page.module.css';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tag = slug?.[0];
  const filterTag = tag === 'all' ? undefined : (tag as NoteTag);
  const data = await fetchNotes({ tag: filterTag, page: 1 });

  return (
    <div className={css.container}>
      <NoteList notes={data.notes} />
    </div>
  );
}
