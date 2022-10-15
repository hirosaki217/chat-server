require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const useragent = require('express-useragent');
const db = require('./config/db');

const app = express();
const port = process.env.SERVER_PORT;

db.connect();

app.use(cors());
app.use(useragent.express());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.json({
        code: 200,
        success: true,
    });
});

server.listen(port, function () {
    console.log('server started on http://localhost:' + port);
});
