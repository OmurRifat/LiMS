"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// Defining the schema for the Book model
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "FANTASY", "BIOGRAPHY"], required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
