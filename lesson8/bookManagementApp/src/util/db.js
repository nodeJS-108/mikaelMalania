const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// new instance of class in other words, we initialize the class
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
);

module.exports = sequelize;
