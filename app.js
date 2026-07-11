const express = require('express');
const docRouter = require('./routes/docRouter');

// create an express app
const app = express();

// setup the middleware for the endpoints
app.use('/api/v1', docRouter);

// export the app
module.exports = app;