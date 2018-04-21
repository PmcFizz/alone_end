/**
 * Created by Fizz on 2018/4/21.
 */
var Answer = require(MODELS).Answer

// 添加一条回答
exports.addOneAnswer = (newAnswer, cb) => {
  Answer.createOne(newAnswer, cb)
}

// 查询回答
exports.queryAnswers = (query, opt, cb) => {
  Answer
    .find(query, opt)
    .exec(cb)
}

// 分页查询回答
exports.queryAnswerByPage = function (query, opt, cb) {
  Answer
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取回答总条数
exports.countAnswer = function (query, cb) {
  Answer
    .count(query)
    .exec(cb)
}

// 删除一个回答
exports.delOneAnswer = function (query, cb) {
  Answer.removeOne(query, cb)
}

// 更新回答
exports.updateOneAnswer = function (query, updateData, cb) {
  Answer.updateOne(query, updateData, cb)
}