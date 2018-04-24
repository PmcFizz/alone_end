/**
 * Created by Fizz on 2017/8/10.
 */

let router = require('express').Router()
let waitreplace = require(PROXY).waitreplace
let async = require('async')
let reqBody

/**
 * add one waitreplace api
 */
router.post('/createOne', (req, res) => {
  reqBody = req.body
  waitreplace.addOneWaitreplace(reqBody, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 *  query waitreplace data by page
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
      waitreplace.countWaitreplace(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      waitreplace.queryWaitreplaceByPage(query, opt, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    }

  ], (err, result) => {
    let dataTableModel = {
      recordsFiltered: result[0],
      recordsTotal: result[0],
      data: result[1]
    }
    return res.json(dataTableModel)
  })
})

/**
 * del one data
 */
router.post('/delOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  waitreplace.delOneWaitreplace({_id: id}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query only one waitreplace data
 */
router.post('/queryById', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  waitreplace.findOneWaitreplace(id, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query waitreplace data
 */
router.post('/commonQuery', (req, res) => {
  reqBody = req.body
  let option = {}
  waitreplace.queryWaitreplaces(reqBody, option, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * update one waitreplace data
 */
router.post('/updateOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  waitreplace.updateOneWaitreplace({_id: id}, {$set: reqBody}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

module.exports = router