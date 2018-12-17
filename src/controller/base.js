var router = require('express').Router()
var projectInfo = require('../projectInfo.json')
var multer = require('multer')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var xlsx = require('node-xlsx')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    var str = file.originalname.split('.')
    cb(null, Date.now() + '.' + str[1])
  }
})
var upload = multer({storage: storage})

// 上传图片到图片仓库并返回上传的图片路径
router.post('/uploadImgs', upload.array('file', 20), function (req, res, next) {
  var arr = []
  for (var i in req.files) {
    arr.push(global.SERVICEADDRESS + '' + req.files[i].filename)
  }
  res.json({
    code: 200,
    data: arr
  })
})

// 获取项目信息
router.get('/getPorjectInfo', function (req, res) {
  RETURNSUCCESS(res, projectInfo)
})

// 生成Token
router.post('/signToken', function (req, res) {
  let key = 'Fizz'
  var token = jwt.sign({name: 'Fizz', userId: '123456'}, key, {expiresIn: 60}) // 一分钟后失效
  RETURNSUCCESS(res, {token})
})

// 验证Token
router.post('/verifyToken', function (req, res) {
  var token = req.headers.accesstoken
  let key = 'Fizz'
  jwt.verify(token, key, (err, decoded) => {
    if (err) console.log(err)
    RETURNSUCCESS(res, decoded)
  })
})

// 导入excel
router.get('/uploadExcel', function (req, res) {
  let data = [
    {
      name: '第一个sheet',
      data: [['字段1', '字段2', '字段3'], ['1', 'Michael', '99'], ['2', 'Tom', '98']]
    },
    {
      name: '第二个sheet',
      data: [['A1', 'B1'], ['A2', 'B2']]
    }
  ]

  // 将格式化的数据写如excel文件
  let buffer = xlsx.build(data)
  fs.writeFile('./resut.xls', buffer, function (err) {
    if (err) {
      console.log(err, '保存excel出错')
    } else {
      console.log('写入excel成功!!!')
      // 读取excel
      var obj = xlsx.parse('./' + 'resut.xls')
      console.log('读取excel成功' + JSON.stringify(obj))

      // 下载excel表
      res.setHeader('Content-Type', 'application/vnd.openxmlformats')
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'export.xlsx')
      res.end(buffer, 'binary')
    }
  })
})

// 导出excel
router.post('/exportExcel', function (req, res) {
  let returnObj = {}
  res.json(returnObj)
})

module.exports = router