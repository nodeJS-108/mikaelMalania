const express = require('express');
const bookRouter = express.Router();

const bookService = require('./services/bookService');

bookRouter.post('/add', bookService.addBook);
bookRouter.get('/getAll', bookService.getAll);
bookRouter.get('/getOne', bookService.getOne);
bookRouter.put('/update', bookService.updateBook);
bookRouter.delete('/delete', bookService.deleteBook);

module.exports = bookRouter;
