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
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bookId = req.body.book;
        let quantity = req.body.quantity;
        let borrow = new borrow_model_1.Borrow(req.body);
        let bookCopies = yield borrow.bookCopiesInstanceMethod(bookId);
        if (!bookCopies || bookCopies.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available"
            });
        }
        else {
            borrow = yield borrow.save();
            // Update the book's available copies
            let remainingCopies = bookCopies.copies - quantity;
            yield borrow_model_1.Borrow.updateBookMethod(bookId, remainingCopies);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
