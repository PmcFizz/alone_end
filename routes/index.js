require('./connectDB')

module.exports = function (app) {
  // baseAPI
  require('./base')(app)
  app.use('/user', require(CONTROLLERS + '/user'))
  app.use('/question', require(CONTROLLERS + '/question'))
  app.use('/answer', require(CONTROLLERS + '/answer'))
}
