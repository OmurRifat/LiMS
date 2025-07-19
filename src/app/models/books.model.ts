import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";
// Defining the schema for the Book model
const bookSchema = new Schema<IBooks>({
    title: { type: String, required: true },
    author: {type: String, required: true},
    genre: {type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY", "BIOGRAPHY"], required: true},
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});

export const Book = model('Book', bookSchema);