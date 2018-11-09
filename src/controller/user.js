var router = require('express').Router()
let user = require(PROXY).user
let {isPhoneNumber, isEmail, isValidUserpwd} = require('../tools/validate')
let sendMail = require('../tools/mail')
let registerMailContent = require('../config/mailConfig').registerMailContent
let async = require('async')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/tokenKey')
// 注册用户
router.post('/createOne', function (req, res) {
  let params = req.body
  let phoneNo = params.phoneNo
  let email = params.email
  let password = params.password
  if (!isPhoneNumber(phoneNo)) {
    return RETURNFAIL(res, {msg: '手机号必须是11位数字'})
  }
  if (email && !isEmail(email)) {
    return RETURNFAIL(res, {msg: '邮箱格式不正确'})
  }
  if (!isValidUserpwd(password)) {
    return RETURNFAIL(res, {msg: '密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线'})
  }
  if (email) {
    sendMail(email, '师匠,为自由而生', registerMailContent)
  }
  user.queryUsers({phoneNo: params.phoneNo}, {}, (err, data) => {
    if (data.length !== 0) {
      return RETURNFAIL(res, {msg: '该手机号已注册'})
    } else {
      user.addOneUser(params, (err, data) => {
        if (err) {
          return RETURNFAIL(res, err)
        } else {
          req.session.userId = data._id
          return RETURNSUCCESS(res, {msg: '注册成功'})
        }
      })
    }
  })
})

// 登录
router.post('/login', function (req, res) {
  let params = req.body
  let phoneNo = params.phoneNo
  if (!isPhoneNumber(phoneNo)) {
    return RETURNFAIL(res, {msg: '手机号必须是13位数字'})
  }
  user.queryUsers({phoneNo: params.phoneNo}, {}, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      if (data.length === 0) {
        return RETURNFAIL(res, {msg: '没有查到该用户'})
      } else {
        if (params.password === data[0].password) {
          req.session.userId = data[0]._id
          return RETURNSUCCESS(res, {msg: '登录成功'})
        } else {
          return RETURNFAIL(res, {msg: '密码错误'})
        }
      }
    }
  })
})

// 登出
router.post('/logout', function (req, res) {
  req.session.userId = null
  return RETURNSUCCESS(res, {msg: '登录成功'})
})

// 查询用户
router.post('/query', function (req, res) {
  let params = req.body
  user.queryUsers(params, {password: 0}, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, data)
    }
  })
})

router.get('/sendmail', function (req, res) {
  sendMail('1046048974@qq.com', '师匠,为自由而生', registerMailContent)
  return res.json({code: 200, msg: '通信成功'})
})

// 测试session登录
router.get('/test-session-login', function (req, res) {
  req.session.userId = '123'
  return res.json({code: 200, msg: '通信成功'})
})

// 测试session拦截
router.get('/test-session-lanjie', function (req, res) {
  if (req.session.userId) {
    return res.json({code: 200, msg: '存在userId'})
  } else {
    return res.json({code: 200, msg: '没有userId'})
  }
})

// 验证邮箱
router.post('/validateEmail', function (req, res) {
  RETURNSUCCESS(res, {name: 1})
})

// 绑定手机号
router.post('/bindPhone', function (req, res) {
  RETURNSUCCESS(res, {name: 1})
})

// 获取个人信息
router.post('/getUserInfoById', function (req, res) {
  RETURNSUCCESS(res, {name: 1})
})

// 查询用户
router.post('/commonQueryUser', function (req, res) {
  RETURNSUCCESS(res, {name: 1})
})

// 查询当前登录人的信息
router.post('/queryMyInfo', (req, res) => {
  let params = req.body
  let userId = req.session.userId
  if (!userId) {
    return res.json({code: 10004, msg: '登录过期或未登录'})
  }
  params._id = userId
  user.queryUsers(params, {password: 0}, (err, data) => {
    let result = data[0]
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, result)
    }
  })
})

// 更新用户信息
router.post('/updateOneUser', (req, res) => {
  let params = req.body
  let phoneNo = params.phoneNo
  let email = params.email
  let userId = req.session.userId
  if (!userId) {
    return res.json({code: 10004, msg: '登录过期或未登录'})
  }
  if (!isPhoneNumber(phoneNo)) {
    return RETURNFAIL(res, {msg: '手机号必须是13位数字'})
  }
  if (email && !isEmail(email)) {
    return RETURNFAIL(res, {msg: '邮箱格式不正确'})
  }
  user.updateOneUser({_id: userId}, params, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, {msg: '修改成功'})
    }
  })
})

// 后台管理端登陆接口
router.post('/admin-userLogin', function (req, res) {
  let reqData = req.body
  if (reqData.account === 'pmc' && reqData.password === 'isbetter') {
    return RETURNSUCCESS(res, {name: 1})
  } else {
    return RETURNFAIL(res, {msg: '账户或密码错误'})
  }
})

// 分页查询用户
router.post('/queryByPage', function (req, res) {
  let reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    let nameKeyWord = {$regex: new RegExp(reqBody.name.trim())}
    query.$or = [{name: nameKeyWord, shortName: nameKeyWord}]
  }
  opt.limit = reqBody.pageSize || 10
  opt.skip = reqBody.pageIndex * 10 || 0

  async.parallel([
    (cb) => {
      user.countUser(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      user.queryUserByPage(query, opt, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    }

  ], (err, result) => {
    if (err) {
      return RETURNFAIL(res, err)
    }
    let dataTableModel = {
      recordsFiltered: result[0],
      recordsTotal: result[0],
      records: result[1]
    }
    return RETURNSUCCESS(res, dataTableModel)
  })
})

// 登录注册用户
router.post('/registerAndLogin', (req, res) => {
  let reqBody = req.body
  user.queryUsers({nickName: reqBody.nickName}, (err, queryData) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      if (queryData && queryData.length > 0) {
        // 直接登录
        req.session.userId = queryData[0]._id
        var token = jwt.sign({name: 'Fizz', userId: queryData[0]._id}, tokenKey.publicKey, {expiresIn: 60 * 60}) // 1h后失效
        return RETURNSUCCESS(res, {accessToken: token})
      } else {
        user.addOneUser(reqBody, (createErr, createData) => {
          if (createErr) {
            return RETURNFAIL(res, createErr)
          } else {
            req.session.userId = createData._id
            var token = jwt.sign({name: 'Fizz', userId: createData._id}, tokenKey.publicKey, {expiresIn: 60 * 60}) // 1h后失效
            return RETURNSUCCESS(res, {accessToken: token})
          }
        })
      }
    }
  })
})

module.exports = router