/**
 * Created by Fizz on 2017/8/10.
 */

let router = require('express').Router()
let company = require(PROXY).company
let async = require('async')

/**
 * add one company api
 */
router.post('/createOne', (req, res) => {
  let reqBody = req.body
  company.addOneCompany(reqBody, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 *  query company data by page
 */
router.post('/queryByPage', (req, res) => {
  let reqBody = req.body
  let query = {}
  let opt = {}
  if (reqBody.name) {
    let nameKeyWord = {$regex: new RegExp(reqBody.name.trim())}
    query.$or = [{name: nameKeyWord}, {shortName: nameKeyWord}]
  }
  opt.limit = reqBody.pageSize || 10
  opt.skip = reqBody.pageIndex * 10 || 0

  async.parallel([
    (cb) => {
      company.countCompany(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      company.queryCompanyByPage(query, opt, (error, returnData) => {
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
      records: result[1]
    }
    return RETURNSUCCESS(res, dataTableModel)
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
    company.countCompany(query, (error, returnData) => {
      if (error) {
        reject(error)
      } else {
        resolve(returnData)
      }
    })
  })

  CountPromise
    .then(function (count) {
      company.queryCompanyByPage(query, opt, (error, returnData) => {
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
  company.delOneCompany({_id: id}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * query only one company data
 */
router.post('/queryById', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  company.findOneCompany(id, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * batch create companys
 */
router.post('/batchCreate', (req, res) => {
  let reqBody = req.body
  console.log(reqBody)
  let companys = reqBody.companys
  if (companys instanceof Array) {
    company.addManyCompanys(companys, (err, data) => {
      if (err) {
        return RETURNFAIL(res, err)
      } else {
        return RETURNSUCCESS(res, {msg: '批量添加成功'})
      }
    })
  } else {
    return RETURNFAIL(res, {msg: '请求数据格式不正确'})
  }
})

/**
 * query company data
 */
router.post('/commonQuery', (req, res) => {
  let reqBody = req.body
  let option = {}
  company.queryCompanys(reqBody, option, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

/**
 * update one company data
 */
router.post('/updateOne', (req, res) => {
  let reqBody = req.body
  let id = reqBody._id ? reqBody._id : reqBody.id
  delete reqBody._id
  delete reqBody.id
  company.updateOneCompany({_id: id}, {$set: reqBody}, (error, resData) => {
    if (error) {
      return RETURNFAIL(res, error)
    } else {
      return RETURNSUCCESS(res, resData)
    }
  })
})

module.exports = router