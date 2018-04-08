/**
 * 2018年4月8日15:27:57
 */
global.BASEDIR = __dirname
global.CONTROLLERS = global.BASEDIR + '/src/controller'
global.MODELS = global.BASEDIR + '/src/model'
global.PROXY = global.BASEDIR + '/src/proxy'

//  global return success
global.RETURNSUCCESS = function (res, data) {
  return res.json({'code': 200, 'data': data, msg: '请求成功'})
}

//  global return fail
global.RETURNFAIL = function (res, data) {
  return res.json({'code': 500, 'data': data, msg: '请求错误'})
}