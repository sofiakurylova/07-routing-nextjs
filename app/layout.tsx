import type { Metadata } from 'next';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Note taking app',
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
