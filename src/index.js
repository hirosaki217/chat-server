require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const useragent = require('express-useragent');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.SERVER_PORT;
const refreshTokenRouter = require('./routes/refreshTokentRouter');

// routes
const routerAuth = require('./routes/auth');

db.connect();

app.use(cors());
app.use(useragent.express());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use('/refresh_token', refreshTokenRouter);
const server = http.createServer(app);

app.use('/', routerAuth);

server.listen(port, function () {
    console.log('server started on http://localhost:' + port);
});
