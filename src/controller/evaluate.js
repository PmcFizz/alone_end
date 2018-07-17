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
  if(!userId){
    return res.json({code: 10004, msg: '登录过期或未登录'})
  }
  reqBody.createUserId = userId
  if(!reqBody.companyId){
    return RETURNFAIL(res, {msg:'缺少公司id'})
  }
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
  if(!userId){
    return res.json({code: 10004, msg: '登录过期或未登录'})
  }
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

/**
 * 查询公司的评价
 */
router.post('/queryCompanyEvaluate', (req, res) => {
  let reqBody = req.body
  let query = {}
  let opt = {}
  query.companyId = reqBody.id ? reqBody.id : reqBody._id
  async.waterfall([
    (cb) => {
      evaluate.queryEvaluates(query, opt, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (arg, cb) => {
      let count = 0
      let returnData = []
      if(arg.length == 0){cb(null,arg)}
      for(let i in arg){
        evaluate.queryEvaluateUser(arg[i]._id, (error, evaluate) => {
          if (error) {
            cb(error)
          } else {
            let cloned = JSON.parse(JSON.stringify(arg[i]))
            cloned['nickName'] = evaluate.createUserId.nickName
            cloned['headPicture'] = evaluate.createUserId.headPicture
            returnData.push(cloned)
            ++count == arg.length ? cb(null,returnData) : ''
          }
        })
      }
    }
  ], (error, result) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, result)
    }
  })
})

module.exports = router