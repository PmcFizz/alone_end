/**
 * Created by Fizz 2018年4月8日16:42:42
 * 用户数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let userSchema = new Schema({
  name: String, // 名字
  age: Number, // 年龄
  password: String, // 密码
  email: String, // 邮箱
  phoneNo: Number, // 手机号码
  birthday: {type: Date}, // 生日
  createDate: {type: Date, default: Date.now()}, // 创建时间
  status: {type: Number, default: 1}, // 状态 0:未激活;1:正常使用中;2:锁定
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

// 表字段验证规则
validate.add('name', {
  required: true,
  msg: '缺少用户名'
})

// 表字段验证规则
validate.add('phoneNo', {
  required: true,
  msg: '缺少手机号'
})

// 表字段验证规则
validate.add('password', {
  required: true,
  msg: '缺少密码'
})

filter.add('name', 'trim')
filter.add('password', 'trim')

MongooseValidateFilter.validateFilter(userSchema, validate, filter)
mongoose.model('User', userSchema)