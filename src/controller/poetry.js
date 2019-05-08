/**
 * Created by Fizz on 2019年5月6日14:26:15
 */
let router = require('express').Router()
let poetry = require(PROXY).poetry
let moment = require('moment')
let async = require('async')

/**
 * 查询一首显示到Tab的诗
 */
router.get('/getOnePoetry', function (req, res) {
  let query = {
    forDate: moment().format('YYYY-MM-DD')
  }
  if (req.body.forDate) query.forDate = req.body.forDate
  let opt = {
    limit: 1
  }
  poetry.queryPoetryByPage(query, opt, (error, returnData) => {
    res.json({
      data: returnData[0],
      error
    })
  })
})

/**
 * 创建一首诗
 */
router.post('/createOne', function (req, res) {
  let reqBody = req.body
  let forDate = ''
  if (reqBody.forDate) {
    forDate = reqBody.forDate
    let saveData = {
      title: reqBody.title,
      content: reqBody.content,
      forDate: moment(forDate).format('YYYY-MM-DD')
    }
    poetry.addOnePoetry(saveData, (error, returnData) => {
      res.json({ data: returnData, error })
    })
  } else {
    // 需要先查出最大的forDate
    poetry.findMaxForDate({}, function (err, oneItem) {
      console.log(err)
      let currentMaxForDate = ''
      if (oneItem && oneItem.length > 0) {
        currentMaxForDate = oneItem[0].forDate
      }
      currentMaxForDate = currentMaxForDate || moment().subtract(1, 'days').format('YYYY-MM-DD')
      forDate = moment(currentMaxForDate).add(1, 'days').format('YYYY-MM-DD')
      let saveData = {
        title: reqBody.title,
        content: reqBody.content,
        forDate
      }
      poetry.addOnePoetry(saveData, (error, returnData) => {
        res.json({ data: returnData, error })
      })
    })
  }
})

/**
 * 分页查询诗
 */
router.get('/getPoetryByPage', function (req, res) {
  let reqBody = req.body
  let query = {}
  let opt = {}
  opt.limit = reqBody.pageSize || 10
  opt.skip = reqBody.pageIndex * 10 || 0

  async.parallel([
    (cb) => {
      poetry.countPoetry(query, (error, returnData) => {
        if (error) {
          cb(error)
        } else {
          cb(null, returnData)
        }
      })
    },
    (cb) => {
      poetry.queryPoetryByPage(query, opt, (error, returnData) => {
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
 * 根据id查询诗的详情
 */
router.get('/getDetailById', function (req, res) {
  const {_id} = req.query
  poetry.queryPoetrys({_id}, {}, function (error, arr) {
    if (error) {
      return RETURNFAIL(res, error)
    }
    return RETURNSUCCESS(res, {arr})
  })
})

// 更新诗
router.post('/update', function (req, res) {
  let updateDate = req.body
  let _id = updateDate._id
  delete updateDate._id
  poetry.updateOnePoetry({_id}, {$set: updateDate}, function (error, arr) {
    if (error) {
      return RETURNFAIL(res, error)
    }
    return RETURNSUCCESS(res, {arr})
  })
})

module.exports = router