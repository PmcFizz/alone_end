var router = require('express').Router()
let user = require(PROXY).user
let {isPhoneNumber, isEmail, isValidUserpwd} = require('../tools/validate')
let sendMail = require('../tools/mail')
let registerMailContent = require('../config/mailConfig').registerMailContent

// 注册用户
router.post('/createOne', function (req, res) {
  let params = req.body
  let phoneNo = params.phoneNo
  let email = params.email
  let password = params.password
  if (!isPhoneNumber(phoneNo)) {
    return RETURNFAIL(res, {msg: '手机号必须是13位数字'})
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
        return RETURNSUCCESS(res, {msg: '没有查到该用户'})
      } else {
        if (params.password === data[0].password) {
          return RETURNSUCCESS(res, {msg: '登录成功'})
        } else {
          return RETURNSUCCESS(res, {msg: '密码错误'})
        }
      }
    }
  })
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

module.exports = router