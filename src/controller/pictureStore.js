/**
 * Created by Fizz on 2018/4/21.
 */

let router = require('express').Router()
let pictureStore = require(PROXY).pictureStore
let async = require('async')
let reqBody

// 验证Token
// router.post('/verifyToken', function (req, res) {
//   var token = req.headers.accesstoken
//   let key = 'Fizz'
//   jwt.verify(token, key, (err, decoded) => {
//     if (err) console.log(err)
//     RETURNSUCCESS(res, decoded)
//   })
// })

/**
 * add one pictureStore api
 */
router.post('/createOne', (req, res) => {
  reqBody = req.body
  pictureStore.addOnePictureStore(reqBody, (error, returnData) => {
    return RETURNSUCCESS(res, returnData)
  })
})

/**
 * use dateTable query pictureStore data
 */
router.post('/queryByPage', (req, res) => {
  reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    query.name = reqBody.name
  }
  opt.limit = reqBody.length
  opt.skip = reqBody.start

  async.parallel([
    (cb) => {
      pictureStore.countPictureStore(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      pictureStore.queryPictureStoreByPage(query, opt, (error, returnData) => {
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
      data: result[1]
    }
    return res.json(dataTableModel)
  })
})

/**
 * query only one  pictureStore data
 */
router.post('/queryById', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  pictureStore.findOnePictureStore(id, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * query pictureStore data
 */
router.post('/commonQuery', (req, res) => {
  reqBody = req.body
  let option = {}
  pictureStore.queryPictureStores(reqBody, option, (error, returnData) => {
    return RETURNSUCCESS(res, returnData)
  })
})

/**
 * update one pictureStore data
 */
router.post('/updateOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  pictureStore.updateOnePictureStore({_id: id}, {$set: reqBody}, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

// 向仓库中添加图片
router.post('/pushImgToStore', (req, res) => {
  let pictureUrlArr = req.body.pictureUrlArr || []
  if (req.body.storeId) {
    pictureStore.updateOnePictureStore({_id: req.body.storeId}, {$addToSet: {pictureUrlArr: {$each: pictureUrlArr}}}, (err, data) => {
      if (!err) {
        return RETURNSUCCESS(res, data)
      } else {
        return RETURNFAIL(res, err)
      }
    })
  } else {
    pictureStore.updateOnePictureStore({isCommon: true}, {$addToSet: {pictureUrlArr: {$each: pictureUrlArr}}}, (err, data) => {
      if (!err) {
        return RETURNSUCCESS(res, data)
      } else {
        return RETURNFAIL(res, err)
      }
    })
  }
})

// 查询公共图片仓库的数据
router.get('/getStoreImg', (req, res) => {
  let query = req.body
  pictureStore.queryPictureStores(query, {}, (err, data) => {
    if (!err) {
      return RETURNSUCCESS(res, data[0])
    } else {
      return RETURNFAIL(res, err)
    }
  })
})

module.exports = router