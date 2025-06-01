import { Request, Response } from 'express';
import logger from '../utils/logger';
import Flashcard from '../models/Flashcards';
import { handleError, handleSuccess } from '../utils/responseHandler';
import Category from '../models/Category';

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const { question, answers, categoryId } = req.body;
    if (!question || !answers || answers.length < 2 || !categoryId) {
      logger.warn('Question and at least two answers are required', {
        id: req.params.id,
      });
      return handleError(
        res,
        'Question and at least two answers are required',
        400
      );
    }

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      logger.warn('Category not found', { id: categoryId });
      return handleError(res, 'Category not found', 404);
    }
    if (!answers.some((a: any) => a.isCorrect)) {
      logger.warn('At least one answer must be correct', { id: req.params.id });
      return handleError(res, 'At least one answer must be correct', 400);
    }
    const flashcard = new Flashcard({ question, answers, categoryId: categoryId });
    await flashcard.save();
    return handleSuccess(res, 'Question added successfully', flashcard, 201);
  } catch (err) {
    logger.warn('Error adding flashcard', { error: err });
    return handleError(res, 'Error adding flashcard', 500);
  }
}