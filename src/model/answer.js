/**
 * Created by Fizz on 2018/4/21.
 * 回答数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let answerSchema = new Schema({
  content: String, // 回答内容
  createUserId: {type: Schema.Types.ObjectId, ref: 'User'}, // 创建用户Id
  questionId: {type: Schema.Types.ObjectId, ref: 'Question'}, // 问题id
  isHideName: {type: Boolean, default: false}, // 是否匿名回答
  createDate: {type: Date, default: Date.now()}, // 创建时间
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

// 表字段验证规则
validate.add('content', {
  required: true,
  msg: '缺少回答内容'
})

// 表字段验证规则
validate.add('questionId', {
  required: true,
  msg: '缺少问题Id'
})

filter.add('content', 'trim')

MongooseValidateFilter.validateFilter(answerSchema, validate, filter)
mongoose.model('Answer', answerSchema)