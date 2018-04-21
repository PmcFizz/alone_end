/**
 * Created by Fizz on 2018/4/21.
 * 问题数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let questionSchema = new Schema({
  title: String, // 问题标题
  companyName: String, // 公司名字
  questionDes: String, // 问题描述
  isHideName: Boolean, // 是否匿名
  createUserId: {type: Schema.Types.ObjectId, ref: 'User'}, // 创建用户Id
  answerIds: [{type: Schema.Types.ObjectId, ref: 'Answer'}], // 回答id集合
  createDate: {type: Date, default: Date.now()}, // 创建时间
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

// 表字段验证规则
validate.add('title', {
  required: true,
  msg: '缺少问题标题'
})

// 表字段验证规则
validate.add('companyName', {
  required: true,
  msg: '缺少公司名字'
})

filter.add('title', 'trim')
filter.add('companyName', 'trim')

MongooseValidateFilter.validateFilter(questionSchema, validate, filter)
mongoose.model('Question', questionSchema)