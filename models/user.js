/**
 * Created by zhangfuhao on 2018/4/11.
 */

var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  userId: String,
  username: String,
  password: String,
  description: {type: String, default: '好好学习，天天向上'},
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

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', UsersSchema);