require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./route/route');
require('./DB/db');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.use(routes);

server.get('/', (req, res) => {
    res.status(200).send('<h1>server started</h1>');
});

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
