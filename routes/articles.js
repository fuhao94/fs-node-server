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

router.post('/getArticleList', function (req, res, next) {
  var params = {
    userId: req.headers.userid,
    article_type: req.body.article_type
  };
  if (req.body.keyWords) {
    params.article_title = req.body.keyWords
  }
  Article.find(params, function (err, doc) {
    if (err) {
      res.json({
        status: 2000,
        msg: err,
        result: '查询失败'
      })
    } else {
      if (doc.length > 0) {
        res.json({
          status: 1000,
          msg: doc,
          result: '查询成功'
        })
      } else {
        res.json({
          status: 1000,
          msg: '',
          result: '查询成功'
        })
      }
    }
  })
});

router.get('/getArticleDetail', function (req, res, next) {
  var params = {
    _id: req.query.article_id
  };
  Article.findOne(params, function (err, doc) {
    if (err) {
      res.json({
        status: 2001,
        msg: err,
        result: '查询失败'
      })
    } else {
      if (doc) {
        doc.article_count += 1;
        doc.save(function (err1, doc1) {
          if (err1) {
            res.json({
              status: 2002,
              msg: err1,
              result: '查询失败'
            })
          } else {
            if (doc1) {
              res.json({
                status: 1000,
                msg: doc1,
                result: '查询成功'
              })
            }
          }
        });
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

router.post('/articleEdit', function (req, res, next) {
  var params = {
    article_title: req.body.article_title,
    article_type: req.body.article_type,
    article_content: req.body.article_content
  };
  Article.update({_id: req.body.article_id}, params, function (err, doc) {
    if (err) {
      res.json({
        status: 2001,
        msg: err,
        result: '编辑失败'
      })
    } else {
      res.json({
        status: 1000,
        msg: '',
        result: '修改成功'
      })
    }
  })
});

module.exports = router;


