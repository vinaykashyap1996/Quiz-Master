'use client';
import CategoryCard from '@/components/CategoryCard';
import { useCategories } from '../context/CategoryContext';
import AddCategoryModal from '@/components/AddCategoryModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Play() {
  const { categories, refreshCategories } = useCategories();
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);

  const handleAddCategory = () => {
    refreshCategories();
  };

  return (
    <main className='flex-grow p-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center'>
        Choose a Quiz Category
      </h1>

      <div>
        <AddCategoryModal
          open={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onAdd={handleAddCategory}
        />
      </div>
      {categories.length === 0 && (
        <div className='text-center text-gray-500 dark:text-gray-100 text-2xl'>
          No categories available. Please add a category to get started.
        </div>
      )}

      {categories.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20'>
          {categories.map(({ _id, name, description, image }) => (
            <CategoryCard
              key={name}
              imageSrc={!image ? image : '/images/science.jpeg'}
              name={name}
              description={description}
              href={`/flashcards?category=${_id}`}
            />
          ))}
        </div>
      )}
      <div
        className={`flex items-center justify-center ${
          categories.length > 0 ? 'mt-14' : 'mt-6'
        }`}>
        <Button
          type='button'
          onClick={() => setShowCategoryModal(true)}
          className='bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500 ml-2'>
          + Add Category
        </Button>
      </div>
    </main>
  );
}
