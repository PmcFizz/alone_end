require('./connectDB')

module.exports = function (app) {
  // baseAPI
  require('./base')(app)
  app.use('/user', require(CONTROLLERS + '/user'))
  app.use('/question', require(CONTROLLERS + '/question'))
  app.use('/answer', require(CONTROLLERS + '/answer'))
  app.use('/company', require(CONTROLLERS + '/company'))
  app.use('/occupationalHistory', require(CONTROLLERS + '/occupationalHistory'))
  app.use('/evaluate', require(CONTROLLERS + '/evaluate'))
  app.use('/pictureStore', require(CONTROLLERS + '/pictureStore'))
  app.use('/design', require(CONTROLLERS + '/design'))
}
