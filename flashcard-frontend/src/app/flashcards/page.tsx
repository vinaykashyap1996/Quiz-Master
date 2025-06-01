'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizResult } from '../quizresult/page';
import { fetchQuestionsByCategory, Question } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionOptions } from '@/components/QuestionsOptions';

export default function Quiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [disableOptions, setDisableOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch questions and map to UI format
  useEffect(() => {
    async function fetchQuestions() {
      if (!categoryId) return;
      setLoading(true);
      try {
        const data = await fetchQuestionsByCategory(categoryId);
        //@ts-expect-error data might not have a 'data' property
        const mapped = (data.data || data).map((q: Question) => ({
          ...q,
          options: q.answers.map((a) => a.text),
          answerIndex: q.answers.findIndex((a) => a.isCorrect),
        }));
        setQuestions(mapped);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [categoryId]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6'>
        <Spinner />
      </div>
    );
  }
  if (questions.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-6'>
        <p className='text-lg text-gray-700 dark:text-gray-300'>
          No questions available for this category.
        </p>
        <Button
          type='button'
          onClick={handleBackToCategories}
          className='mt-4 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
          Back to Categories
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent =
    ((currentIndex + (selectedOption !== null ? 1 : 0)) / questions.length) *
    100;

  function handleOptionClick(index: number) {
    if (selectedOption !== null || disableOptions) return;
    setSelectedOption(index);
    setDisableOptions(true);
  }

  function handleNext() {
    if (selectedOption === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
    setDisableOptions(false);
    setSelectedOption(null);

    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePlayAgain() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setDisableOptions(false);
  }

  function handleBackToCategories() {
    router.push('/play');
  }

  if (isFinished) {
    return (
      <QuizResult
        score={score}
        total={questions.length}
        onPlayAgain={handlePlayAgain}
        onBack={handleBackToCategories}
      />
    );
  }

  return (
    <>
      <ProgressBar percent={progressPercent} />
      <main className='flex-grow max-w-3xl mx-auto p-6 flex flex-col justify-center'>
        <div className='rounded-xl bg-card  dark:bg-gray-900 shadow-xl px-10 py-8 text-center max-w-md w-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                Question {currentIndex + 1} of {questions.length}
              </h2>
              <p className='mt-3 text-lg text-gray-800 dark:text-gray-200'>
                {currentQuestion?.question}
              </p>
            </motion.div>
          </AnimatePresence>
          <QuestionOptions
            options={currentQuestion?.options}
            selectedOption={selectedOption}
            answerIndex={currentQuestion?.answerIndex}
            isAnswered={selectedOption !== null}
            onSelect={handleOptionClick}
            disableOptions={disableOptions}
          />
          <motion.button
            onClick={handleNext}
            disabled={selectedOption === null}
            whileHover={{ scale: selectedOption !== null ? 1.05 : 1 }}
            whileTap={{ scale: selectedOption !== null ? 0.95 : 1 }}
            className={`mt-10 px-6 py-3 rounded-md text-white font-semibold transition
            ${
              selectedOption === null
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500'
            }
          `}>
            {currentIndex === questions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </motion.button>
        </div>
      </main>
    </>
  );
}
