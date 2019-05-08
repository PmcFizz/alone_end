/**
 * Created by Fizz on 2019年5月6日14:30:35
 */
var Poetry = require(MODELS).Poetry

// 添加一条诗
exports.addOnePoetry = (newPoetry, cb) => {
  Poetry.createOne(newPoetry, cb)
}

// 查询诗
exports.queryPoetrys = (query, opt, cb) => {
  Poetry
    .find(query, opt)
    .exec(cb)
}

// 分页查询诗
exports.queryPoetryByPage = function (query, opt, cb) {
  Poetry
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取诗总条数
exports.countPoetry = function (query, cb) {
  Poetry
    .count(query)
    .exec(cb)
}

// 删除一个诗
exports.delOnePoetry = function (query, cb) {
  Poetry.removeOne(query, cb)
}

// 更新诗
exports.updateOnePoetry = function (query, updateData, cb) {
  Poetry.findOneAndUpdate(query, updateData, cb)
}

// 查询一条最大的forDate
exports.findMaxForDate = function (query, cb) {
  Poetry
    .find(query)
    .sort('-forDate')
    .limit(1)
    .exec(cb)
}