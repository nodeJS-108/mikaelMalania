const joi = require('joi');
const bookRepo = require('./booksRepo');
const ObjectId = require('mongodb').ObjectId;

async function addBook(req, res) {
  const bookCreationSchema = joi.object({
    title: joi.string().max(100).required(),
    author: joi.string().max(100).required(),
    genre: joi.string().optional(),
    coverImage: joi.string().uri().optional(),
    description: joi.string().max(1000).optional(),
  });

  const { error, value: requestBody } = bookCreationSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ sccess: false, message: error.details[0].message });
  }

  requestBody.createdAt = new Date();

  const addBook = await bookRepo.addBook(requestBody);

  if (addBook.acknowledged) {
    return res.status(200).json({
      success: true,
      message: 'New Book has been added successfully!',
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Cloud not add data to database',
    });
  }
}

async function getAll(req, res) {
  const allBooks = await bookRepo.getAllBooks();

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
}

async function getOne(req, res) {
  const bookId = req.query.user;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID',
    });
  }

  const book = await bookRepo.getBookById(bookId);

  return res.status(200).json({
    success: true,
    data: book,
  });
}

async function updateBook(req, res) {
  const bookId = req.query.bookId;
  const bookUpdateSchema = joi.object({
    title: joi.string().max(100).optional(),
    author: joi.string().max(100).optional(),
    genre: joi.string().optional(),
    coverImage: joi.string().uri().optional(),
    description: joi.string().max(1000).optional(),
  });

  const { error, value: requestBody } = bookUpdateSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ sccess: false, message: error.details[0].message });
  }

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID',
    });
  }

  const updatedBook = await bookRepo.updateBook(bookId, requestBody);
  console.log(updatedBook);
  if (updatedBook.matchedCount) {
    return res.status(200).json({
      success: true,
      message: 'Book has been updated successfully!',
    });
  } else {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }
}

async function deleteBook(req, res) {
  const bookId = req.query.bookId;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid book ID',
    });
  }

  const deletedBook = await bookRepo.deleteBook(bookId);

  if (deletedBook.deletedCount) {
    return res.status(200).json({
      success: true,
      message: 'Book has been deleted successfully!',
    });
  } else {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
    });
  }
}

module.exports = {
  addBook,
  getAll,
  getOne,
  updateBook,
  deleteBook,
};
