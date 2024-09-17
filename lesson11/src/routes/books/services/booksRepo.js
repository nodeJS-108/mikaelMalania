const connectTo = require('../../../services/mongodbDriver').getClient();
const collection = connectTo.db('libraryApp').collection('books');

async function addBook(bookData) {
    return await collection.insertOne(bookData);
}

async function getAllBooks() {
    return await collection.find().toArray();
}

module.exports = {
    addBook,getAllBooks
}