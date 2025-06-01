import { Response } from 'express';

export const handleSuccess = (res: Response, message: string, data: any = {}, statusCode: number = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const handleError = (res: Response, message: string, statusCode: number = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};