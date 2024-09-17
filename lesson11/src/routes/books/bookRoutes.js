const express = require('express');
const bookRouter = express.Router();

const bookService = require('./services/bookService')

bookRouter.post('/add', bookService.addBook);
bookRouter.get('/getAll', bookService.getAll);

module.exports = bookRouter;