'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddCategoryModal, { Category } from '@/components/AddCategoryModal';
import { useCategories } from '../context/CategoryContext';
import { addQuestion } from '@/lib/api';
import { MoveLeft } from 'lucide-react';

type Answer = {
  text: string;
  isCorrect: boolean;
};

export default function AddQuestion() {
  const router = useRouter();
  const { categories, refreshCategories } = useCategories();
  const [showAlert, setShowAlert] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [error, setError] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleAnswerTextChange = (index: number, text: string) => {
    setAnswers((prev) =>
      prev.map((ans, i) => (i === index ? { ...ans, text } : ans))
    );
  };

  const handleAddAnswer = () => {
    setAnswers((prev) => [...prev, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    if (answers.length <= 2) return;
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): string => {
    if (!questionText.trim()) return 'Please enter the question text.';
    if (!category) return 'Please select a category.';
    if (answers.length < 2) return 'Please provide at least two answers.';
    if (answers.some((ans) => !ans.text.trim()))
      return 'Answer options cannot be empty.';
    if (!answers.some((ans) => ans.isCorrect))
      return 'Please select at least one correct answer.';
    return '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');

    const newQuestion = {
      question: questionText,
      categoryId: category,
      answers: answers,
    };
    try {
      await addQuestion(newQuestion);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push('/play');
      }, 1500);
    } catch (err) {
      setError('Failed to add question. Please try again.');
      console.error('Error adding question:', err);
      return;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      router.push('/play');
    }, 1500);
  };

  const isSubmitDisabled =
    !questionText.trim() ||
    !category ||
    answers.length < 2 ||
    answers.some((ans) => !ans.text.trim()) ||
    answers.findIndex((a) => a.isCorrect) === -1;

  const handleAddCategory = (cat: Category) => {
    refreshCategories();
    setCategory(cat.name);
  };
  return (
    <main className='max-w-3xl mx-auto p-6 bg-slate-50 dark:bg-gray-800 rounded-lg shadow-md'>
      <AddCategoryModal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onAdd={handleAddCategory}
      />
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
            router.push('/play');
          }}>
          Question added successfully!
        </Alert>
      )}
      <div className='flex items-start justify-between mb-4 cursor-pointer'>
        <MoveLeft onClick={() => router.back()} />
      </div>
      <h1 className='text-3xl font-semibold mb-6 dark:text-white font-bold'>
        Add a New Quiz Question
      </h1>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 bg-slate-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg'>
        <div>
          <div className='flex items-center justify-between mb-2'>
            <label htmlFor='category' className='font-medium dark:text-white'>
              Category
            </label>
            <Button
              type='button'
              onClick={() => setShowCategoryModal(true)}
              className='bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500 ml-2'>
              + Add Category
            </Button>
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              id='category'
              className='w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  <div className='flex items-center space-x-2'>
                    <span>{cat.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor='question'
            className='block mb-2 font-medium dark:text-white'>
            Question Text
          </label>
          <textarea
            id='question'
            value={questionText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setQuestionText(e.target.value)
            }
            rows={3}
            className='w-full rounded-md border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            placeholder='Enter your quiz question here'
            required
          />
        </div>

        <div>
          <label className='block mb-2 font-medium dark:text-white'>
            Answer Options
          </label>
          <RadioGroup
            value={
              answers.findIndex((a) => a.isCorrect) !== -1
                ? answers.findIndex((a) => a.isCorrect).toString()
                : ''
            }
            onValueChange={(val: string) => {
              const idx = parseInt(val, 10);
              setAnswers((prev) =>
                prev.map((ans, i) => ({
                  ...ans,
                  isCorrect: i === idx,
                }))
              );
            }}>
            {answers.map((answer, idx) => (
              <div key={idx} className='flex items-center mb-3 space-x-3'>
                <RadioGroupItem
                  value={idx.toString()}
                  checked={answer.isCorrect}
                  aria-label={`Mark answer ${idx + 1} as correct`}
                  className='w-5 h-5 text-indigo-600 dark:text-indigo-400'
                />
                <input
                  type='text'
                  value={answer.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleAnswerTextChange(idx, e.target.value)
                  }
                  placeholder={`Answer option ${idx + 1}`}
                  className='flex-grow rounded-md border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  required
                />
                {answers.length > 2 && (
                  <Button
                    type='button'
                    onClick={() => handleRemoveAnswer(idx)}
                    className='text-red-500 hover:text-red-700'
                    aria-label='Remove answer option'>
                    &times;
                  </Button>
                )}
              </div>
            ))}
          </RadioGroup>
          <Button
            type='button'
            onClick={handleAddAnswer}
            className='mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500 transition'>
            + Add Answer Option
          </Button>
        </div>

        {error && <p className='text-red-600'>{error}</p>}

        <Button
          type='submit'
          className='w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition font-semibold disabled:opacity-60'
          disabled={isSubmitDisabled}>
          Save Question
        </Button>
      </form>
    </main>
  );
}
