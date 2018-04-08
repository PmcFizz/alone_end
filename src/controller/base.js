var router = require('express').Router()
var projectInfo = require('../projectInfo.json')

// 获取项目信息
router.get('/getPorjectInfo', function (req, res) {
  RETURNSUCCESS(res, projectInfo)
})
module.exports = router