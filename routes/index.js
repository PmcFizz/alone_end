require('./connectDB')

module.exports = function (app) {
  // baseAPI
  require('./base')(app)
  app.use('/api/user', require(CONTROLLERS + '/user'))
  app.use('/api/question', require(CONTROLLERS + '/question'))
  app.use('/api/answer', require(CONTROLLERS + '/answer'))
}
