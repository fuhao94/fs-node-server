/**
 * Created by zhangfuhao on 2018/4/14.
 */

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
  userId: String,
  article_title: String,
  article_type: String,
  article_content: String,
  article_count: {type: Number, default: 0},
  comment: String,
  replay: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

module.exports = mongoose.model('Article', ArticleSchema);