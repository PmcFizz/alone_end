/**
 * Created by Fizz on 2017/8/10.
 */

let router = require('express').Router()
let occupationalHistory = require(PROXY).occupationalHistory
let async = require('async')
let reqBody

/**
 * add one occupationalHistory api
 */
router.post('/createOne', (req, res) => {
  reqBody = req.body
  occupationalHistory.addOneOccupationalHistory(reqBody, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 *  query occupationalHistory data by page
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
      occupationalHistory.countOccupationalHistory(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      occupationalHistory.queryOccupationalHistoryByPage(query, opt, (error, returnData) => {
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
  occupationalHistory.delOneOccupationalHistory({_id: id}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query only one occupationalHistory data
 */
router.post('/queryById', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  occupationalHistory.findOneOccupationalHistory(id, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query occupationalHistory data
 */
router.post('/commonQuery', (req, res) => {
  reqBody = req.body
  let option = {}
  occupationalHistory.queryOccupationalHistorys(reqBody, option, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * update one occupationalHistory data
 */
router.post('/updateOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  occupationalHistory.updateOneOccupationalHistory({_id: id}, {$set: reqBody}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

module.exports = router