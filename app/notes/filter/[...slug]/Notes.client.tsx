'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { NoteTag } from '@/types/note';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterTag = tag === 'all' || !tag ? undefined : (tag as NoteTag);

  const handleSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', filterTag, page, debouncedSearch],
    queryFn: () => fetchNotes({ tag: filterTag, page, search: debouncedSearch }),
  });

  return (
    <div>
      <SearchBox
        value={search}
        onChange={(value) => {
          setSearch(value);
          handleSearch(value);
        }}
      />
      <button onClick={() => setIsModalOpen(true)}>Add note</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong.</p>}
      {data && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
