require('dotenv').config();
const express = require('express');
const cors =  require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const mongodb = require('./config/mongodb');
const DATABASE_URL = mongodb.mongodb_host;
const PORT = process.env.DB_PORT || 27017;
//const PORT = mongodb.mongodb_port;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);

mongoose.connect(DATABASE_URL);

console.log(`Listen on http://localhost:${PORT}`);

app.listen(PORT);

module.exports = app;
