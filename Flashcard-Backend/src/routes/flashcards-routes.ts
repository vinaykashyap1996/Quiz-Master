import { Request, Response, Router } from 'express';
import Flashcard from '../models/Flashcards';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';
import { addQuestion } from '../controllers/addQuestion';
import { getQuestions } from '../controllers/getQuestions';
import { editQuestion } from '../controllers/editQuestion';
import { deleteQuestion } from '../controllers/deleteQuestion';
import Category from '../models/Category';
import { addCategory } from '../controllers/addCategory';

const router: Router = Router();

router.get('/categories', async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        if (!categories || categories.length === 0) {
            logger.warn('No categories found');
            return handleError(res, 'No categories found', 404);
        }
        return handleSuccess(res, 'Categories retrieved successfully', categories);
    }
    catch (error) {
        logger.error('Error retrieving categories', { error });
        return handleError(res, 'Error retrieving categories', 500);
    }
});

router.post('/add-category', addCategory);
router.post('/add-question', addQuestion);
router.get('/questions-by-category', async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.query;
        if (!categoryId) {
            logger.warn('Category ID is required');
            return handleError(res, 'Category ID is required', 400);
        }
        const questions = await Flashcard.find({ categoryId })
        if (!questions || questions.length === 0) {
            logger.warn('No questions found for this category', { categoryId });
            return handleError(res, 'No questions found for this category', 404);
        }
        return handleSuccess(res, 'Questions retrieved successfully', questions);
    } catch (error) {
        logger.error('Error retrieving questions by category', { error });
        return handleError(res, 'Error retrieving questions by category', 500);
    }
})
router.get('/questions', getQuestions);
router.put('/edit/:id', editQuestion);
router.delete('/delete/:id', deleteQuestion);

export default router;
