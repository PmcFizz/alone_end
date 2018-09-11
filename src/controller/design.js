/**
 * Created by Fizz on 2018年9月11日11:02:25
 */

let router = require('express').Router()
let design = require(PROXY).design

/**
 * add one design api
 */
router.post('/createOne', (req, res) => {
  let reqBody = req.body
  design.addOneDesign(reqBody, (error, returnData) => {
    if (error) {
      return RETURNFAIL(res, returnData)
    } else {
      return RETURNSUCCESS(res, returnData)
    }
  })
})

/**
 * 使用promise编写分页查询接口
 */
router.get('/queryByPageUsePromise', (req, res) => {
  let reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    let nameKeyWord = {$regex: new RegExp(reqBody.name.trim())}
    query.$or = [{name: nameKeyWord}, {shortName: nameKeyWord}]
  }
  opt.limit = reqBody.pageSize || 10
  opt.skip = reqBody.pageIndex * 10 || 0

  let CountPromise = new Promise(function (resolve, reject) {
    design.countDesign(query, (error, returnData) => {
      if (error) {
        reject(error)
      } else {
        console.log(returnData)
        resolve(returnData)
      }
    })
  })

  CountPromise
    .then(function (count) {
      design.queryDesignByPage(query, opt, (error, returnData) => {
        if (error) {
          return RETURNFAIL(res, error)
        }
        console.log(returnData)
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
 * query only one  design data
 */
router.post('/queryById', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  design.findOneDesign(id, (error, returnData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, returnData)
    }
  })
})

/**
 * query design data
 */
router.post('/commonQuery', (req, res) => {
  let reqBody = req.body
  let option = {}
  design.queryDesigns(reqBody, option, (error, returnData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, returnData)
    }
  })
})

/**
 * update one design data
 */
router.post('/updateOne', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  design.updateOneDesign({_id: id}, {$set: reqBody}, (error, returnData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, returnData)
    }
  })
})

module.exports = router