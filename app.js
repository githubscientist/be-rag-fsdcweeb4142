const express = require('express');
const docRouter = require('./routes/docRouter');

// create an express app
const app = express();

// parse the request body
app.use(express.json());

// setup the middleware for the endpoints
app.use('/api/v1', docRouter);

// export the app
module.exports = app;