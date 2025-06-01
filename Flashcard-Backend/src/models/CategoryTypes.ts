import { Document, Types } from "mongoose";

export interface Category extends Document {
    name: string;
    description?: string;
    image?: string;
    createdAt?: Date;
}