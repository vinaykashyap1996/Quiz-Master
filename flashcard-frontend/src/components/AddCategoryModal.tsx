'use client';

import { FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { addCategory } from '@/lib/api';

export interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

function AddCategoryModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (cat: {
    _id?: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !imageUrl.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await addCategory(name, description, imageUrl);
      onAdd({ name, description, imageUrl });
      setName('');
      setDescription('');
      setImageUrl('');
      onClose();
    } catch {
      setError('Failed to add category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4 dark:text-white'>
          Add New Category
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block mb-1 font-medium dark:text-white'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium dark:text-white'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              required
            />
          </div>
          <div>
            <label className='block mb-1 font-medium dark:text-white'>
              Image URL
            </label>
            <input
              type='url'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className='w-full rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              required
            />
          </div>
          {error && <p className='text-red-600'>{error}</p>}
          <div className='flex justify-end space-x-2'>
            <Button
              type='button'
              onClick={onClose}
              className='bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100'>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={loading}
              className='bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500'>
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
