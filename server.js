const app = require("./app");
const { PORT, HOST, MONGODB_URI } = require("./utils/config");
const mongoose = require('mongoose');

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log(`Connected to MongoDB Database!`);

        app
            .listen(PORT, HOST, () => {
                console.log(`Server running at http://${HOST}:${PORT}`);
            });

        app.on('error', (err) => {
            console.error('Error starting server:', err);
        });
    })
    .catch((err) => {
        console.log(`Error connecting to MongoDB Database.`);
        console.error(err.message);
    });