/**
 * Created by Fizz on 2018/4/21.
 */

let router = require('express').Router()
let pictureStore = require(PROXY).pictureStore
let async = require('async')
let reqBody

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
    return RETURNSUCCESS(error, returnData, res)
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

module.exports = router