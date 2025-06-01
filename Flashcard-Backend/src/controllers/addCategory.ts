import { Request, Response } from 'express';
import Category from '../models/Category';
import logger from '../utils/logger';
import { handleError, handleSuccess } from '../utils/responseHandler';

export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name, description, imageUrl } = req.body;
        if (!name) {
            logger.warn('Category name is required.', {
                id: req.params.id,
            });
            return handleError(res, 'Category name is required.', 400);
        }
        const existing = await Category.findOne({ name });
        if (existing) {
            logger.warn('Category already exists.', { name });
            return handleError(res, 'Category already exists.', 400);
        }
        const category = new Category({ name, description, image: imageUrl });
        await category.save();
        return handleSuccess(res, 'Category added successfully.', category, 201);
    } catch (error) {
        logger.error('Error adding category.', { error });
        return handleError(res, 'Error adding category.', 500);
    }
};
