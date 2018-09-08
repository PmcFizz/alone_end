var router = require('express').Router()
var projectInfo = require('../projectInfo.json')
var multer = require('multer')
let PictureStore = require(PROXY).pictureStore

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

// 获取项目信息
router.post('/getPorjectInfo', function (req, res) {
  RETURNSUCCESS(res, projectInfo)
})

module.exports = router