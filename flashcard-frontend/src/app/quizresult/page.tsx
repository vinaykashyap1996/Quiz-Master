'use client';
import ConfettiEffect from '@/components/Confetti';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { LucidePartyPopper, TrophyIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const QuizResult = ({
  score,
  total,
  onPlayAgain,
  onBack,
}: {
  score: number;
  total: number;
  onPlayAgain: () => void;
  onBack: () => void;
}) => {
  const [showConfetti, setShowConfetti] = useState<boolean>(score === total);
  const handleShowConfetti = () => {
    setShowConfetti(false);
    setTimeout(() => setShowConfetti(true), 10);
  };

  return (
    <main className='flex-grow flex items-center justify-center p-4'>
      {showConfetti && (
        <div className='fixed bottom-8 right-8 z-50'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='w-18 h-18 rounded-full dark:bg-gray-900 text-white shadow-lg hover:shadow-blue-500/50 transition duration-200 cursor-pointer'
                  onClick={handleShowConfetti}>
                  <LucidePartyPopper
                    className='h-18 w-18 text-blue-600'
                    size={'28px'}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='top'>
                <p className='text-sm'>Celebrations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      {showConfetti && <ConfettiEffect />}
      <motion.div
        className='rounded-xl bg-card  dark:bg-gray-900 shadow-xl px-10 py-8 text-center max-w-md w-full'
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
        <motion.div
          className='flex justify-center mb-4 text-primary'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}>
          <TrophyIcon className='w-12 h-12 animate-bounce' />
        </motion.div>
        <motion.h2
          className='text-3xl font-bold text-primary mb-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          Your Score:{' '}
          <span className='text-foreground'>
            {score} / {total}
          </span>
        </motion.h2>
        <motion.p
          className='text-muted-foreground mb-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          {score === total
            ? 'Perfect! 🎉 Great job!'
            : "Keep practicing and you'll get better!"}
        </motion.p>

        <motion.div
          className='flex flex-col sm:flex-row gap-3 justify-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <Button
            size='lg'
            className='w-full sm:w-auto cursor-pointer'
            onClick={onPlayAgain}>
            Play Again
          </Button>
          <Link href='/play' passHref>
            <Button
              size='lg'
              variant='outline'
              className='w-full sm:w-auto border border-primary text-primary cursor-pointer'
              onClick={onBack}>
              Back to Categories
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};
