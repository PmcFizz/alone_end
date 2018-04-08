module.exports = function (app) {
//  首页
  app.use('/base', require(CONTROLLERS + '/base'))
}