/**
 * Created by zhangfuhao on 2018/4/14.
 */

var express = require('express');
var router = express.Router();
var Article = require('../models/article');

router.post('/add', function (req, res, next) {
  Article.create({
    userId: req.body.userId,
    article_title: req.body.article_title,
    article_type: req.body.article_type,
    article_content: req.body.article_content
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 2000,
        msg: err,
        result: '发布失败'
      })
    } else {
      res.json({
        status: 1000,
        msg: '',
        result: '发布成功'
      })
    }
  })
});

router.get('/detail', function (req, res, next) {
  Article.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: 2000,
        msg: err,
        result: '查询失败'
      })
    } else {
      if (doc) {
        res.json({
          status: 1000,
          msg: doc,
          result: '查询成功'
        })
      } else {
        res.json({
          status: 1000,
          msg: '没有数据',
          result: '查询成功'
        })
      }
    }
  })
});

module.exports = router;


