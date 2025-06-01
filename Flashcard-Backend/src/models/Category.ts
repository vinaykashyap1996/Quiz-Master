import mongoose, { Schema } from 'mongoose';
import { Category } from './CategoryTypes';

const FlashcardSchema: Schema = new Schema<Category>({
    name: { type: String, required: true },
    description: { type: String, },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Category>('Category', FlashcardSchema);