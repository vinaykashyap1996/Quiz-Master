'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className='flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md'>
      <Link
        href='/'
        className='text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer transition-colors hover:text-indigo-600 dark:hover:text-indigo-400'>
        Quiz Master
      </Link>

      <Button
        onClick={toggleDarkMode}
        aria-label='Toggle Dark Mode'
        className='focus:outline-none bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer'>
        {isDark ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-yellow-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3v1m0 16v1m8.66-9h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-900 dark:text-gray-100'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
            />
          </svg>
        )}
      </Button>
    </header>
  );
}
