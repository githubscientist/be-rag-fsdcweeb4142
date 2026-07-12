require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = {
    MONGODB_URI,
    PORT,
    HOST,
    OPENAI_API_KEY,
}