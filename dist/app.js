"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrow", borrow_controller_1.borrowRouter);
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});
app.use((req, res, next) => {
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
app.use((err, req, res, next) => {
    res.status(400).json({
        message: err.message || 'An error occurred',
        success: false,
        error: err
    });
});
exports.default = app;
