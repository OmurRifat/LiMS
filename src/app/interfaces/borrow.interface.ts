import { Document, Model, Types } from "mongoose";

export interface IBorrowBase {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}

export interface IBorrowInstanceMethods {
    bookCopiesInstanceMethod(bookId: Types.ObjectId): {copies: number} | null;
}

export interface IBorrow extends Document, IBorrowBase, IBorrowInstanceMethods {}

export interface UpdateBooksCollection extends Model<IBorrow> {
    updateBookMethod(bookId: Types.ObjectId, quantity: number): void;
}