import { Suspense } from 'react';
import Flashcards from './Flashcards';
import { Spinner } from '@/components/ui/spinner';

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Flashcards />
    </Suspense>
  );
}
