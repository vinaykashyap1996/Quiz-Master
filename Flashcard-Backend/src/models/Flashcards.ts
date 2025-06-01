import mongoose, { Schema } from 'mongoose';
import { IAnswer, IFlashcard } from './FlashcardsTypes';

const AnswerSchema: Schema = new Schema<IAnswer>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const FlashcardSchema: Schema = new Schema<IFlashcard>({
  question: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true },
  answers: { type: [AnswerSchema], required: true, validate: [(val: IAnswer[]) => val.length > 1, 'At least two answers required'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFlashcard>('questions', FlashcardSchema);