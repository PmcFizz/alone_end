/**
 * Created by FizzPang on 2017/8/10.
 */

let mongoose = require('mongoose')
let schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

const companySchema = new schema({
  name: String, // 公司名
  shortName: '', // 公司短名
  companyLink: '', // 公司官网
  logo: '', // 公司logo
  createUserId: {type: schema.Types.ObjectId, ref: 'user'}, // 创建人
  createDate: {type: Date, default: Date.now()}, // 创建时间
  status: {type: Number, default: 1}, // 状态
  basic: {type: Object}, // 融资阶段,人数,类型,地址
  type: String, // 公司类型
  companyAddress: String, // 公司地址
  tags: {type: Array}, // 标签
  companyIntroText: String, // 公司介绍
  isImport: {type: Boolean, default: false}, // 是否是导入的
  lastModifiedDate: {type: Date, default: Date.now()} // 最后更新时间
})

// 表字段验证规则
validate.add('name', {
  required: true,
  msg: '缺少公司名'
})

filter.add('name', 'trim')
MongooseValidateFilter.validateFilter(companySchema, validate, filter)
mongoose.model('Company', companySchema)
