/**
 * Created by FizzPang on 2017/8/10.
 * 评价表
 */

let mongoose = require('mongoose')
let schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

const evaluateSchema = new schema({
  content: String, // 评价内容
  isHideName: Boolean, // 是否匿名
  companyId: {type: schema.Types.ObjectId, ref: 'Company'}, // 评价的公司id
  createUserId: {type: schema.Types.ObjectId, ref: 'User'}, // create User ID
  createDate: {type: Date, default: Date.now}, // create time
  status: {type: Number, default: 1}, // status
  lastModifiedDate: {type: Date, default: Date.now()} // the last modift time
})

validate.add('content', {
  required: true,
  msg: 'content is must defind'
})

filter.add('content', 'trim')
MongooseValidateFilter.validateFilter(evaluateSchema, validate, filter)
mongoose.model('Evaluate', evaluateSchema)
