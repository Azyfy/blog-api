var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config()
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogadminRouter = require("./routes/blogadmin");

const helmet = require("helmet");

var app = express();

app.use(helmet());
const compression = require("compression");

// DB
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error",  console.error.bind(console, "MongoDB connection error;"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

//enable cors
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/blogadmin", blogadminRouter);

module.exports = app;
