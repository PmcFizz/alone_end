var router = require('express').Router()
let user = require(PROXY).user

// 注册用户
router.post('/createOne', function (req, res) {
  let params = req.body
  user.addOneUser(params, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, data)
    }
  })
})

// 登录
router.post('/login', function (req, res) {
  let params = req.body
  user.queryUsers(params, {}, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, data)
    }
  })
})

// 查询用户
router.post('/query', function (req, res) {
  let params = req.body
  user.queryUsers(params, {}, (err, data) => {
    if (err) {
      return RETURNFAIL(res, err)
    } else {
      return RETURNSUCCESS(res, data)
    }
  })
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