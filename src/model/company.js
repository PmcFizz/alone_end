/**
 * Created by FizzPang on 2017/8/10.
 */

let mongoose = require('mongoose')
let schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

const companySchema = new schema({
  name: String, // name
  createUserId: {type: schema.Types.ObjectId, ref: 'user'}, // create User ID
  createDate: {type: Date, default: Date.now()}, // create time
  status: {type: Number, default: 1}, // status
  lastModifiedDate: {type: Date, default: Date.now()} // the last modift time
})

// 表字段验证规则
validate.add('content', {
  required: true,
  msg: '缺少回答内容'
})

filter.add('name', 'trim')
MongooseValidateFilter.validateFilter(companySchema, validate, filter)
mongoose.model('Company', companySchema)
