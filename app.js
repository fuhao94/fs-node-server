var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:950328@47.106.146.21:27017/blog');
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success')
});
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail')
});
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected')
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/art', articlesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  if (req.cookies.userId) {
    res.cookie('userId', req.cookies.userId, {
      path: '/',
      maxAge: 1000 * 60 * 60
    });
    next();
  } else {
    if (req.originalUrl == '/users/login' || req.originalUrl == '/users/register' || req.path == '/users/logout') {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
