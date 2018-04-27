// 链接数据库
let mongoose = require('mongoose')

var promise = mongoose.connect('mongodb://localhost/alone', {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
})
promise.then(function (db) {
  if (db) {
    console.log('^_^^_^数据库已链接,请尽情表演^_^^_^')
  } else {
    console.log('(⊙︿⊙)(⊙︿⊙)数据库链接错误(⊙︿⊙)(⊙︿⊙)')
  }
})
