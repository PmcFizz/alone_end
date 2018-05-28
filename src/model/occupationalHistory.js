/**
 * Created by FizzPang on 2017/8/10.
 * 个人工作任职历史表
 */

let mongoose = require('mongoose')
let schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

const occupationalHistorySchema = new schema({
  companyName: String, // 公司名
  userId: {type: schema.Types.ObjectId, ref: 'user'}, // 关联用户表
  startTime: {type: Date, default: Date.now()}, // 任职开始时间
  endTime: {type: Date, default: Date.now()}, // 任职结束时间
  position: String, // 职位
  workDes: String, // 工作描述
  createUserId: {type: schema.Types.ObjectId, ref: 'user'}, // create User ID
  createDate: {type: Date, default: Date.now()}, // create time
  status: {type: Number, default: 1}, // status
  lastModifiedDate: {type: Date, default: Date.now()} // the last modift time
})

validate.add('companyName', {
  required: true,
  msg: 'companyName is must defind'
})

MongooseValidateFilter.validateFilter(occupationalHistorySchema, validate, filter)
mongoose.model('OccupationalHistory', occupationalHistorySchema)
