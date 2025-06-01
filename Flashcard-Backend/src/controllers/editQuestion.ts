import Flashcards from "../models/Flashcards";
import logger from "../utils/logger";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { Request, Response } from "express";

export const editQuestion = async (req: Request, res: Response) => {
  try {
    const { question, answers } = req.body;
    if (!question || !answers || answers.length < 2) {
      logger.warn('Question and at least two answers are required', {
        id: req.params.id,
      });
      return handleError(
        res,
        'Question and at least two answers are required',
        400
      );
    }
    if (!answers.some((a: any) => a.isCorrect)) {
      logger.warn('At least one answer must be correct', { id: req.params.id });
      return handleError(res, 'At least one answer must be correct', 400);
    }
    const updated = await Flashcards.findByIdAndUpdate(
      req.params.id,
      { question, answers },
      { new: true }
    );
    if (!updated) {
      logger.warn('Flashcard not found', { id: req.params.id });
      return handleError(res, 'Flashcard not found', 404);
    }
    return handleSuccess(res, 'Question updated successfully', updated, 200);
  } catch (err) {
    logger.warn('Error updating flashcard', { error: err });
    return handleError(res, 'Error updating flashcard', 500);
  }
}