const connectTo = require('../../../services/mongodbDriver').getClient();
const collection = connectTo.db('libraryApp').collection('books');
const { ObjectId } = require('mongodb');

async function addBook(bookData) {
  return await collection.insertOne(bookData);
}

async function getAllBooks() {
  return await collection.find().toArray();
}

async function getBookById(bookId) {
  return await collection.findOne({ _id: new ObjectId(bookId) });
}

/**
 * Updates a book's information in the database.
 *
 * @param {string} bookId - The unique identifier of the book to be updated.
 * @param {Object} updatedBookData - An object containing the updated book information.
 * @returns {Promise<Object>} A promise that resolves to an object containing the update result.
 *                            The object includes information such as the number of documents modified.
 */
async function updateBook(bookId, updatedBookData) {
  return await collection.updateOne(
    { _id: new ObjectId(bookId) },
    { $set: updatedBookData },
  );
}

/**
 * Deletes a book from the database based on its ID.
 *
 * @param {string} bookId - The unique identifier of the book to be deleted.
 * @returns {Promise<Object>} A promise that resolves to an object containing the deletion result.
 *                            The object includes information such as the number of documents deleted.
 */
async function deleteBook(bookId) {
  return await collection.deleteOne({ _id: new ObjectId(bookId) });
}

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
