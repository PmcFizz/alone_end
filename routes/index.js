require('./connectDB')

module.exports = function (app) {
  /**
   * baseAPI公共路径
   */
  require('./base')(app)
  //
  // /**
  //  *使用数据库路由
  //  */
  // require('./data')(app);
  //
  // /**
  //  *个人私人路由
  //  */
  // require('./private')(app);
}
