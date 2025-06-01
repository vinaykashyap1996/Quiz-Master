import { Document, Types } from "mongoose";

export interface IAnswer {
  text: string;
  isCorrect: boolean;
}

export interface IFlashcard extends Document {
  question: string;
  categoryId: Types.ObjectId;
  answers: IAnswer[];
  createdAt: Date;
}