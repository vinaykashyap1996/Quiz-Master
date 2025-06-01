import Flashcards from "../models/Flashcards";
import logger from "../utils/logger";
import { handleError, handleSuccess } from "../utils/responseHandler";
import { Request, Response } from "express";

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deleted = await Flashcards.findByIdAndDelete(req.params.id);
    if (!deleted) {
      logger.warn('Flashcard not found', { id: req.params.id });
      return handleError(res, 'Flashcard not found', 404);
    }
    return handleSuccess(res, 'Question deleted successfully', deleted, 200);
  } catch (err) {
    logger.warn('Error deleting flashcard', { error: err });
    return handleError(res, 'Error deleting flashcard', 500);
  }
}