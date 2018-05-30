/**
 * Created by Fizz on 2017/8/10.
 * 评价接口
 */

let router = require('express').Router()
let evaluate = require(PROXY).evaluate
let async = require('async')

/**
 * add one evaluate api
 */
router.post('/createOne', (req, res) => {
  let reqBody = req.body
  let userId = req.session.userId
  reqBody.createUserId = userId
  evaluate.addOneEvaluate(reqBody, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 *  query evaluate data by page
 */
router.post('/queryByPage', (req, res) => {
  let reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    query.name = reqBody.name
  }
  opt.limit = reqBody.length
  opt.skip = reqBody.start

  async.parallel([
    (cb) => {
      evaluate.countEvaluate(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      evaluate.queryEvaluateByPage(query, opt, (error, returnData) => {
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
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  evaluate.delOneEvaluate({_id: id}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query only one evaluate data
 */
router.post('/queryById', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  evaluate.findOneEvaluate(id, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query evaluate data
 */
router.post('/commonQuery', (req, res) => {
  let reqBody = req.body
  let option = {}
  evaluate.queryEvaluates(reqBody, option, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * update one evaluate data
 */
router.post('/updateOne', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  evaluate.updateOneEvaluate({_id: id}, {$set: reqBody}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * 查询当前登录人写的评价
 */
router.post('/queryMyEvaluate', (req, res) => {
  let reqBody = req.body
  let userId = req.session.userId
  reqBody.createUserId = userId
  let option = {}
  evaluate.queryEvaluates(reqBody, option, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

module.exports = router