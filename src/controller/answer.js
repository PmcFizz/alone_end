/**
 * Created by Fizz on 2018/4/21.
 */

let router = require('express').Router()
let answer = require(PROXY).answer
let async = require('async')
let reqBody

/**
 * add one answer api
 */
router.post('/createOne', (req, res) => {
  reqBody = req.body
  answer.addOneAnswer(reqBody, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * use dateTable query answer data
 */
router.post('/queryByDataTable', (req, res) => {
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
      answer.countAnswer(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      answer.queryAnswerByPage(query, opt, (error, returnData) => {
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
 * del one data
 */
router.post('/delOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  answer.delOneAnswer({_id: id}, (error, resData) => {
    return RETURNSUCCESS(error, resData, res)
  })
})

/**
 * query only one  answer data
 */
router.post('/queryById', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  answer.findOneAnswer(id, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * query answer data
 */
router.post('/commonQuery', (req, res) => {
  reqBody = req.body
  let option = {}
  answer.queryAnswers(reqBody, option, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * update one answer data
 */
router.post('/updateOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  answer.updateOneAnswer({_id: id}, {$set: reqBody}, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

module.exports = router