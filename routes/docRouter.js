const express = require('express');
const { seedDocs, askQuestion } = require('../controllers/docController');

const docRouter = express.Router();

// define the endpoints
docRouter.post('/embed-docs', seedDocs);
docRouter.post('/ask', askQuestion);

module.exports = docRouter;