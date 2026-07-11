const app = require("./app");

app
    .listen(3001, '127.0.0.1', () => {
        console.log(`Server running at http://localhost:3001`);
    });

app.on('error', (err) => {
    console.error('Error starting server:', err);
});