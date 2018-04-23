/**
 * Created by Fizz on 2018/4/21.
 */

let router = require('express').Router()
let question = require(PROXY).question
let async = require('async')
let reqBody

/**
 * add one question api
 */
router.post('/createOne', (req, res) => {
  reqBody = req.body
  question.addOneQuestion(reqBody, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * use dateTable query question data
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
      question.countQuestion(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      question.queryQuestionByPage(query, opt, (error, returnData) => {
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
  question.delOneQuestion({_id: id}, (error, resData) => {
    return RETURNSUCCESS(error, resData, res)
  })
})

/**
 * query only one  question data
 */
router.post('/queryById', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  question.findOneQuestion(id, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * query question data
 */
router.post('/commonQuery', (req, res) => {
  reqBody = req.body
  let option = {}
  question.queryQuestions(reqBody, option, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

/**
 * update one question data
 */
router.post('/updateOne', (req, res) => {
  reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  question.updateOneQuestion({_id: id}, {$set: reqBody}, (error, returnData) => {
    return RETURNSUCCESS(error, returnData, res)
  })
})

module.exports = router