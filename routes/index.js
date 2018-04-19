var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


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

module.exports = router;
