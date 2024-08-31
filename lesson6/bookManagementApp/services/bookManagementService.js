const books = require('../books.json');
const fs = require('fs');

function getAllBooks(req, res) {
  return res.json(books);
}

function getOneBook(req, res) {
  return res.json(req.book);
}

function createBook(req, res) {
  let usedIds = [];

  for (let book of books) {
    usedIds.push(book.id);
  }

  let maxNumber = Math.max(...usedIds);

  let newId = maxNumber + 1;

  let requestBody = req.body;
  requestBody.id = newId;
  books.push(requestBody);

  fs.writeFileSync('books.json', JSON.stringify(books, null, 2));

  return res.json({
    success: true,
    message: 'New Data added',
  });
}

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
};
