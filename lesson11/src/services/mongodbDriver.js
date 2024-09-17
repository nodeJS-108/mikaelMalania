// const MongoClient = require('mongodb').MongoClient;

const { MongoClient } = require('mongodb');
require('dotenv').config({path: '.env'})

const url = process.env.MONGO_DB_URL;
let client;

function init() {
    client = new MongoClient(url);
}

function getClient() {
    // if (!client) {
    //     throw new Error('Could not esabilish connection to the mongoDB Database');
    // }

    return new MongoClient(url);
}

function closeConnection() {
    client.close();
}

module.exports = {
    init, getClient, closeConnection,
}