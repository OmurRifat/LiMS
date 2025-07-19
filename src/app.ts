import express, { Application, NextFunction, Request, Response } from 'express';
import { booksRouter } from './app/controllers/books.controller';
import { borrowRouter } from './app/controllers/borrow.controller';

const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, World!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        error: {
            statusCode: 404,
            path: req.originalUrl,
            method: req.method,
            description: "The requested route does not exist on the server."
        }
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        message: err.message || 'An error occurred',
        success: false,
        error: err
    })
});

export default app;