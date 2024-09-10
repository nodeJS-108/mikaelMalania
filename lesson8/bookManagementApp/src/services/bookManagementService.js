const books = require('../books.json');
const Joi = require('joi');
const BookModel = require('../models/bookModel');
const z = require('zod');

const bookCreationSchema = z.object({
    title: z.string().max(100),
    author: z.string().max(100),
    publication_year: z.number()
        .int()
        .min(1000)
        .max(new Date().getFullYear()),
    genre: z.array(z.string()),
    description: z.string().optional(),
    cover_image: z.string().url(),
});

async function getAllBooks(req, res) {
    const allBooks = await BookModel.findAll();

    return res.json(allBooks);
}

function getOneBook(req, res) {
    const book = req.book;

    return res.status(200).json({
        success: true,
        data: book,
    });
}

async function createBook(req, res) {
    const validationResult = bookCreationSchema.safeParse(req.body);

    if (!validationResult.success) 
        {
        return res
            .status(400)
            .json({ success: false, message: JSON.parse(validationResult.error.message) });
        }

        try {
            const newBook = await BookModel.create(req.body);
            if (!newBook) {
                return res.status(400).json({
                    success: false,
                    message: 'Error, could not add data to db',
                });
            }
        }
        catch (error) { 
            console.error(`Error creating book: ${error}`);
            return res.status(500).json({
                success: false,
                message: String(error),
            });
        }
        


    return res.json({
        success: true,
        message: 'New Data added',
    });
}

const bookUpdateSchema = Joi.object({
    title: Joi.string(),
    author: Joi.string().max(100),
    publication_year: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear()),
    genre: Joi.array(),
    description: Joi.string().allow(null),
    cover_image: Joi.string().uri(),
});

async function updateBook(req, res) {
    const bookId = req.book.id;

    const { error, value: requestBody } = bookUpdateSchema.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    try {
        const [updatedRowsCount] = await BookModel.update(requestBody, {
            where: { id: bookId },
        });

        if (updatedRowsCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Error: book has not been updated',
            });
        }

        return res.json({
            success: true,
            message: 'Book updated successfully',
        });
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

async function deleteBook(req, res) {
    const bookId = req.book.id;

    try {
        const deletedRowsCount = await BookModel.destroy({
            where: { id: bookId },
        });

        if (deletedRowsCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Error, Book has not been deleted',
            });
        }

        return res.json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook,
};
