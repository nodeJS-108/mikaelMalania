const express = require("express");
const dotenv = require('dotenv');
dotenv.config({path: ".env"});

const port = process.env.PORT;

// const bookRoutes = require('./routes/books/bookRoutes')
const bodyParser = require("body-parser");

const run = async() => {
    const app = express();

    app.use(bodyParser.json());

    // app.use('/v1/sbook', bookRoutes);

    app.listen(port, () => {
        console.log("Server is listening at http://localhost:3000")
    })
}

module.exports = {
    run
}