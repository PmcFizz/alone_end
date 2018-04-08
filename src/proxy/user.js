/**
 * Created by Fizz on 2018年4月8日16:46:02.
 */
var user = require(MODELS).user

// 添加一条用户
exports.addOneUser = (newUser, cb) => {
  user.createOne(newUser, cb)
}

// 查询用户
exports.queryUsers = (query, opt, cb) => {
  user
    .find(query, opt)
    .exec(cb)
}

// 分页查询用户
exports.queryUserByPage = function (query, opt, cb) {
  user
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取用户总条数
exports.countUser = function (query, cb) {
  user
    .count(query)
    .exec(cb)
}

// 删除一个用户
exports.delOneUser = function (query, cb) {
  user.removeOne(query, cb)
}

// 更新用户
exports.updateOneUser = function (query, updateData, cb) {
  user.updateOne(query, updateData, cb)
}