const books = require('../books.json');
async function resolveBookId(req, res, next) {
  let bookId = req.params.bookId;
  bookId = parseInt(bookId);

  if (isNaN(bookId)) {
    return res.status(400).json({
      success: false,
      message: 'Error, Invalid book ID',
    });
  }

  let foundBook = {};

  for (let book of books) {
    if (book.id === bookId) {
      foundBook = book;
      break;
    } else {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  }

  req.book = foundBook;
  next();
}

module.exports = { resolveBookId };
