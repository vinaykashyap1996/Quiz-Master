'use client';
import { motion } from 'framer-motion';

export const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div className='w-full bg-gray-300 dark:bg-gray-700 h-3'>
      <motion.div
        className='bg-indigo-600 h-3 dark:bg-indigo-400'
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};
