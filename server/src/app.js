require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const removeHttpHeader = require('./middleware/removeHTTPHeader');
const path = require('path');
const mainRouter = require('./routes/main.routes');

const app = express();

// ---------- CORS ----------
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,          // обязательно, иначе куки не передаются
  })
);

// ---------- СТАНДАРТНЫЕ MIDDLEWARE ----------
app.use(cookieParser());        // читаем куки ДО роутов
app.use(express.json());        // JSON body
app.use(express.urlencoded({ extended: true })); 
app.use(removeHttpHeader);    // твой кастомный middleware (если нужно)
app.use('/icons', express.static(path.join(__dirname, '../public/icons')));
app.use('/patterns', express.static(path.join(__dirname, '../public/patterns')));
// ---------- РОУТЫ ----------
app.use('/', mainRouter);    // все API начинаются с /api

// ---------- ЭКСПОРТ ----------
module.exports = app;

