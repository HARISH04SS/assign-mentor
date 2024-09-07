require('dotenv').config();
const mongoDB_URL = process.env.mongoDB_URL;
const port = process.env.port;

module.exports = {
    mongoDB_URL,
    port
};