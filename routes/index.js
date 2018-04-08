require('./connectDB')

module.exports = function (app) {
  // baseAPI
  require('./base')(app)

  // 用户模块
  require('./user')(app)
  //
  // /**
  //  *个人私人路由
  //  */
  // require('./private')(app);
}
