/**
 * Created by Fizz on 2018年9月11日11:02:25
 */
var Design = require(MODELS).Design

// 添加一条回答
exports.addOneDesign = (newDesign, cb) => {
  Design.createOne(newDesign, cb)
}

// 查询回答
exports.queryDesigns = (query, opt, cb) => {
  Design
    .find(query, opt)
    .exec(cb)
}

// 分页查询回答
exports.queryDesignByPage = function (query, opt, cb) {
  Design
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取回答总条数
exports.countDesign = function (query, cb) {
  Design
    .count(query)
    .exec(cb)
}

// 删除一个回答
exports.delOneDesign = function (query, cb) {
  Design.removeOne(query, cb)
}

// 更新回答
exports.updateOneDesign = function (query, updateData, cb) {
  Design.updateOne(query, updateData, cb)
}

exports.findOneDesign = (id, cb) => {
  Design.findById(id, cb)
}