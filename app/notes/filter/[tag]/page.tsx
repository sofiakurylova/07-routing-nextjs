import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';
import type { NoteTag } from '@/types/note';
import css from './page.module.css';

interface FilterPageProps {
  params: Promise<{ tag: string }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag } = await params;
  const filterTag = tag === 'all' ? undefined : (tag as NoteTag);
  const data = await fetchNotes({ tag: filterTag, page: 1 });

  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.content}>
        <NoteList notes={data.notes} />
      </main>
    </div>
  );
}
