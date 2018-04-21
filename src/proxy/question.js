/**
 * Created by Fizz on 2018/4/21.
 */
var Question = require(MODELS).Question

// 添加一条问题
exports.addOneQuestion = (newQuestion, cb) => {
  Question.createOne(newQuestion, cb)
}

// 查询问题
exports.queryQuestions = (query, opt, cb) => {
  Question
    .find(query, opt)
    .exec(cb)
}

// 分页查询问题
exports.queryQuestionByPage = function (query, opt, cb) {
  Question
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取问题总条数
exports.countQuestion = function (query, cb) {
  Question
    .count(query)
    .exec(cb)
}

// 删除一个问题
exports.delOneQuestion = function (query, cb) {
  Question.removeOne(query, cb)
}

// 更新问题
exports.updateOneQuestion = function (query, updateData, cb) {
  Question.updateOne(query, updateData, cb)
}
