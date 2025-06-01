import express, { Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorhandler';
import flashcardRoutes from './routes/flashcards-routes';

export const app = express();

app.get('/', (req: Request, res: Response): any => {
    return res.status(200).json({ message: 'Welcome to the Todo Backend' });
});

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));


app.use(express.json());
app.use('/api', flashcardRoutes);
app.use(errorHandler);
