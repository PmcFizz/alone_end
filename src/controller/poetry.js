/**
 * Created by Fizz on 2019年5月6日14:26:15
 */
let router = require('express').Router()
let poetry = require(PROXY).poetry

router.get('/getOnePoetry', function (req, res) {
  let query = {}
  let opt = {limit: 1}
  poetry.queryPoetryByPage(query, opt, (error, returnData) => {
    res.json({data: returnData[0], error})
  })
})

module.exports = router