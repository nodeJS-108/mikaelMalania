const joi = require('joi');
const bookRepo = require('./booksRepo')

async function addBook(req, res) {
    const bookCreationSchema = joi.object({
        title: joi.string().max(100).required(),
        author: joi.string().max(100).required(),
        genre: joi.string().optional(),
        coverImage: joi.string().uri().optional(),
        description: joi.string().max(1000).optional()
    })

    const {error, value: requestBody} = bookCreationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({sccess: false, message: error.details[0].message})
    }
    
    requestBody.createdAt = new Date();

    const addBook = await bookRepo.addBook(requestBody);

    if (addBook.acknowledged) {
        return res.status(200).json({
            success: true, 
            message: "New Book has been added successfully!"
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Cloud not add data to database"
        })
    }
    

}

async function getAll(req, res) {
    const allBooks = await bookRepo.getAllBooks();

    return res.status(200).json({
        success: true, 
        data: allBooks
    })
}

module.exports = {
    addBook,getAll
}