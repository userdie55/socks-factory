require('dotenv').config();
const express = require('express');
const router = require('./routes/main.routes');
const removeHttpHeader = require('./middleware/removeHTTPHeader');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    credentials: true,
};

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(removeHttpHeader);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/', router);

module.exports = app;
