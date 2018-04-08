module.exports = function (app) {
//  首页
  app.use('/user', require(CONTROLLERS + '/user'))
}