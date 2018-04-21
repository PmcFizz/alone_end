/**
 * Created by Fizz on 2018年4月8日16:46:02.
 */
var User = require(MODELS).User

// 添加一条用户
exports.addOneUser = (newUser, cb) => {
  User.createOne(newUser, cb)
}

// 查询用户
exports.queryUsers = (query, opt, cb) => {
  User
    .find(query, opt)
    .exec(cb)
}

// 分页查询用户
exports.queryUserByPage = function (query, opt, cb) {
  User
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取用户总条数
exports.countUser = function (query, cb) {
  User
    .count(query)
    .exec(cb)
}

// 删除一个用户
exports.delOneUser = function (query, cb) {
  User.removeOne(query, cb)
}

// 更新用户
exports.updateOneUser = function (query, updateData, cb) {
  User.updateOne(query, updateData, cb)
}