const express = require('express');
const mongoose = require('mongoose');

const port = 3200;
const server = express();

server.get('/', (req, res) => {
    res.send("Server is working");
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});