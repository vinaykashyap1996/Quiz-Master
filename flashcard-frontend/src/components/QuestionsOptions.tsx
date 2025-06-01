'use client';
import { motion } from 'framer-motion';

export const QuestionOptions = ({
  options,
  selectedOption,
  answerIndex,
  isAnswered,
  onSelect,
  disableOptions,
}: {
  options: string[];
  selectedOption: number | null;
  answerIndex: number;
  isAnswered: boolean;
  onSelect: (idx: number) => void;
  disableOptions: boolean;
}) => {
  return (
    <div className='space-y-4'>
      {options.map((option, idx) => {
        const isSelected = selectedOption === idx;
        const isCorrect = answerIndex === idx;
        return (
          <motion.button
            key={idx}
            onClick={() => onSelect(idx)}
            disabled={disableOptions}
            whileHover={{ scale: disableOptions ? 1 : 1.03 }}
            whileTap={{ scale: disableOptions ? 1 : 0.97 }}
            className={`w-full text-left px-4 py-3 rounded-md border
              ${
                !isAnswered
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                  : isSelected && isCorrect
                  ? 'bg-green-600 text-white border-green-600'
                  : isSelected && !isCorrect
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700'
              }
              transition
            `}>
            {option}
          </motion.button>
        );
      })}
    </div>
  );
};
