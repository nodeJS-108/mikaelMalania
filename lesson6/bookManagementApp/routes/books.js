const express = require('express');
const bookRouter = express.Router();
const booksService = require('../services/bookManagementService');
const { resolveBookId } = require('../middlewares/bookId.middleware');

bookRouter.param('bookId', resolveBookId);

bookRouter.post('/books/create', booksService.createBook);
bookRouter.get('/books/getAll', booksService.getAllBooks);
bookRouter.get('/books/getOne/:bookId', booksService.getOneBook);

module.exports = bookRouter;
