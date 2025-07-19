import { model, Schema, Types } from "mongoose";
import { IBorrowInstanceMethods, IBorrow, UpdateBooksCollection } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, UpdateBooksCollection, IBorrowInstanceMethods>({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
})

borrowSchema.method("bookCopiesInstanceMethod", async function (bookId: Types.ObjectId) {
    const book = await Book.findById(bookId).select('copies');
    return book ? { copies: book.copies } : null;
});

borrowSchema.static("updateBookMethod", async function (bookId: Types.ObjectId, quantity: number) {
    await Book.findByIdAndUpdate(bookId, { copies: quantity, available: quantity > 0 });
})

export const Borrow = model<IBorrow, UpdateBooksCollection>('Borrow', borrowSchema);