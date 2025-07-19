import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/books.model';

export const borrowRouter = express.Router();

borrowRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let bookId = req.body.book;
        let quantity = req.body.quantity;
        let borrow = new Borrow(req.body);
        let bookCopies = await borrow.bookCopiesInstanceMethod(bookId);
        if (!bookCopies || bookCopies.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available"
            });
        } else {
            borrow = await borrow.save();
            // Update the book's available copies
            let remainingCopies = bookCopies.copies - quantity;
            await Borrow.updateBookMethod(bookId, remainingCopies);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
            });
        }
    } catch (error) {
        next(error);
    }
})

borrowRouter.get('/', async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const borrows = await Borrow.aggregate([
            // Groping borrow records by book
            {
                $group:{
                    _id: "$book",
                    totalQuantity: {$sum: "$quantity"}
                }
            },
            // Joining with the Book collection to get book details
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                }
            },
            // Taking only the first book details from the joined array
            {
                $unwind: {
                    path: "$book",
                    includeArrayIndex: "0"
                }
            },
            // Adding the total quantity to the book details
            {
                $addFields: {
                    "book.totalQuantity": "$totalQuantity"
                }
            },
            // Projecting the result
            {
                $project: {
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: "$book.totalQuantity",
                    _id: 0
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows
        });
    } catch (error) {
        next(error);
    }
})