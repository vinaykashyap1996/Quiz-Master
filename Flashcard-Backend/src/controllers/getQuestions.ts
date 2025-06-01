import Flashcards from "../models/Flashcards";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { handleError, handleSuccess } from "../utils/responseHandler";

export const getQuestions = async (_req: Request, res: Response) => {
  try {
    const flashcards = await Flashcards.aggregate([{ $sample: { size: 10 } }]);
    logger.info('Fetched all questions successfully');
    handleSuccess(res, 'Lists fetched successfully', {
      questionsCount: flashcards.length,
      questions: flashcards,
    });
  } catch (err) {
    logger.warn('Error fetching quiz questions', { error: err });
    return handleError(res, 'Error fetching quiz questions', 500);
  }
}