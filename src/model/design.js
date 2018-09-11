/**
 * Created by Fizz on 2018年9月11日11:02:25
 * 设计数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let designSchema = new Schema({
  name: String, // 设计名称
  createUserId: {type: Schema.Types.ObjectId, ref: 'User'}, // 创建用户Id
  content: {type: Object, default: {}}, // 内容对象
  state: {type: Number, default: 1}, // 状态
  imgLink: String, // 图片链接
  isPublic: {type: Boolean, default: false}, // 是否公开
  createDate: {type: Date, default: Date.now()}, // 创建时间
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

// 表字段验证规则
validate.add('name', {
  required: true,
  msg: '缺少设计名称'
})

filter.add('name', 'trim')

MongooseValidateFilter.validateFilter(designSchema, validate, filter)
mongoose.model('Design', designSchema)