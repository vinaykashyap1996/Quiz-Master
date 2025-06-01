import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className='flex items-center justify-center py-8'>
      <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
      <span className='ml-2 text-sm text-muted-foreground'>Loading...</span>
    </div>
  );
}
