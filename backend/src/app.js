const express = require("express");
const cors = require("cors");
const userRoutes = require('./api/routes/userRoutes');
const ingredientRoutes = require('./api/routes/ingredientRoutes');
const recipeRoutes = require('./api/routes/recipeRoutes');
const app = express();
const http = require('http');
const net = require('net');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());


app.use(userRoutes);
app.use(ingredientRoutes);
app.use(recipeRoutes);

const port = 8000;

function checkPort(port, callback) {
    const server = net.createServer();

    server.once('error', err => {
        if (err.code === 'EADDRINUSE') {
            callback(false);
        }
    });

    server.once('listening', () => {
        server.close();
        callback(true);
    });

    server.listen(port);
}

checkPort(port, isAvailable => {
    if (isAvailable) {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } else {
        console.log(`Port ${port} is already in use.`);
    }
});

module.exports = app;

