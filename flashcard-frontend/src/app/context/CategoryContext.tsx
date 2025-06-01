'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { fetchCategories } from '@/lib/api';

export type Category = {
  _id?: string;
  name: string;
  description: string;
  image: string;
};

type CategoriesContextType = {
  categories: Category[];
  refreshCategories: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      //@ts-expect-error data type may vary
      const raw = data.data || data;
      const formatted =
        typeof raw[0] === 'string'
          ? raw.map((name: string) => ({
              name: capitalize(name),
              description: '',
              imageUrl: '',
            }))
          : raw.map((cat: Category) => ({
              ...cat,
              name: capitalize(cat.name),
              description: cat.description || '',
              image: cat.image || '',
            }));
      setCategories(formatted);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, refreshCategories: loadCategories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const ctx = useContext(CategoriesContext);
  if (!ctx)
    throw new Error('useCategories must be used within a CategoriesProvider');
  return ctx;
};
