import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/books.model';

export const booksRouter = express.Router();

booksRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let book = new Book(req.body);
        book = await book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (error) {
        next(error);
    }
});

booksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter : string = req.query.filter as string || ""; 
        const sortBy : string = req.query.sortBy as string || "title";
        const sortOrder: string = req.query.sort as string || "asc";
        const limit  = req.query.limit || 10;
        if(filter){
            const books = await Book.find({ genre: filter })
                .sort({[sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1})
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books
            })
        } else {
            const books = await Book.find()
                .sort({[sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1})
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books
            })
        }
    } catch (error) {
        next(error);
    }
});

booksRouter.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if(book){
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: book
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    } catch (error) {
        next(error);
    }
});

booksRouter.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        if(book){
            res.status(200).json({
                success: true,
                message: "Book updated successfully",
                data: book
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    } catch (error) {
        next(error);
    }
});

booksRouter.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId);
        if(book){
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    } catch (error) {
        next(error);
    }
});
