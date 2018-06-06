/**
 * Created by Fizz on 2017/8/10.
 */

let router = require('express').Router()
let waitreplace = require(PROXY).waitreplace

/**
 * add one waitreplace api
 */
router.post('/createOne', (req, res) => {
  let reqBody = req.body
  waitreplace.addOneWaitreplace(reqBody, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 *  query waitreplace data by page use promise
 */
router.post('/queryByPage', (req, res) => {
  let reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    let nameKeyWord = {$regex: new RegExp(reqBody.name.trim())}
    query.$or = [{name: nameKeyWord}]
  }
  opt.limit = reqBody.pageSize || 10
  opt.skip = reqBody.pageIndex * 10 || 0

  let CountPromise = new Promise(function (resolve, reject) {
    waitreplace.countWaitreplace(query, (error, returnData) => {
      if (error) {
        reject(error)
      } else {
        resolve(returnData)
      }
    })
  })

  CountPromise
    .then(function (count) {
      waitreplace.queryWaitreplaceByPage(query, opt, (error, returnData) => {
        if (error) {
          return RETURNFAIL(res, error)
        }
        let dataTableModel = {
          recordsFiltered: count,
          recordsTotal: count,
          records: returnData
        }
        return RETURNSUCCESS(res, dataTableModel)
      })
    })
    .catch(function (error) {
      return RETURNFAIL(res, error)
    })
})

/**
 * del one data
 */
router.post('/delOne', (req, res) => {
  let reqBody = req.body
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
  let reqBody = req.body
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
  let reqBody = req.body
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
  let reqBody = req.body
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