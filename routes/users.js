var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/User', function (req, res, next) {
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


module.exports = router;
