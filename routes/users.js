var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//注册用户
router.post('/register', function (req, res, next) {
  User.create({
    username: req.body.username,
    password: req.body.password
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 2000,
        msg: err,
        result: ''
      })
    } else {
      res.json({
        status: 1000,
        msg: '',
        result: '注册成功'
      })
    }
  })
});

//登录
router.post('/login', function (req, res, next) {
  var param = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: 2000,
        msg: err,
        result: ''
      })
    } else {
      if (doc) {
        res.cookie('userId', doc._id, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: 1000,
          msg: {
            username: doc.username
          },
          result: '登录成功'
        })
      }
    }
  })
});

module.exports = router;
