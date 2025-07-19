"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRouter = express_1.default.Router();
exports.booksRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = new books_model_1.Book(req.body);
        book = yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter || "";
        const sortBy = req.query.sortBy || "title";
        const sortOrder = req.query.sort || "asc";
        const limit = req.query.limit || 10;
        if (filter) {
            const books = yield books_model_1.Book.find({ genre: filter })
                .sort({ [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 })
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books
            });
        }
        else {
            const books = yield books_model_1.Book.find()
                .sort({ [sortBy]: sortOrder.toLowerCase() === "asc" ? 1 : -1 })
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.get('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        if (book) {
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: book
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.put('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        if (book) {
            res.status(200).json({
                success: true,
                message: "Book updated successfully",
                data: book
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.booksRouter.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndDelete(bookId);
        if (book) {
            res.status(200).json({
                success: true,
                message: "Book deleted successfully",
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
