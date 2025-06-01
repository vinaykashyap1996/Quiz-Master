'use client';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BookOpen, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function RulesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl'
          aria-label='Close'>
          &times;
        </button>
        <h2 className='text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300'>
          Rules & Regulations
        </h2>
        <ul className='mb-6 list-disc pl-6 text-gray-800 dark:text-gray-200 space-y-2'>
          <li>Each quiz consists of multiple-choice questions.</li>
          <li>Select the correct answer for each question to score points.</li>
          <li>You can only select one answer per question.</li>
          <li>Your score will be shown at the end of the quiz.</li>
          <li>Try to answer all questions to the best of your ability!</li>
        </ul>
        <h3 className='text-xl font-semibold mb-2 text-green-700 dark:text-green-300'>
          Future Features
        </h3>
        <ul className='list-disc pl-6 text-gray-800 dark:text-gray-200 space-y-2'>
          <li>Timed quizzes and leaderboards</li>
          <li>User accounts and progress tracking</li>
          <li>Quiz categories and difficulty levels</li>
          <li>Question explanations and references</li>
          <li>Community question submissions and voting</li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <RulesModal open={showModal} onClose={() => setShowModal(false)} />
      <div className='fixed bottom-8 right-8 z-50'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='w-18 h-18 rounded-full dark:bg-gray-900 text-white shadow-lg hover:shadow-blue-500/50 transition duration-200'
                onClick={() => setShowModal(true)}>
                <BookOpen className='h-18 w-18 text-blue-600' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p className='text-sm'>Rules & features</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Link
          href='/play'
          className='block bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 text-center cursor-pointer'
          aria-label='Play Quiz'>
          <div className='mx-auto mb-6 w-16 h-16 text-indigo-600 dark:text-indigo-400'>
            <PlayIcon className='w-16 h-16' />
          </div>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>
            Play Quiz
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            Test your knowledge by playing the quiz.
          </p>
        </Link>

        <Link
          href='/createquiz'
          className='block bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 text-center cursor-pointer'
          aria-label='Add Quiz Questions'>
          <div className='mx-auto mb-6 w-16 h-16 text-green-600 dark:text-green-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='w-16 h-16'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4v16m8-8H4'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100'>
            Add Quiz Questions
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            Help us grow the quiz by adding new questions.
          </p>
        </Link>
      </div>
    </>
  );
}
