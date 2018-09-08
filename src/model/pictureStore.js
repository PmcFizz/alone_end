/**
 * Created by Fizz on 2018年9月8日09:53:30.
 * 图片数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let pictureStoreSchema = new Schema({
  name: String, // 仓库名称
  createUserId: {type: Schema.Types.ObjectId, ref: 'User'}, // 创建用户Id
  pictureUrlArr: {type: Array, default: []}, // 图片路径数组
  state: {type: Number, default: 1}, // 状态
  isCommon: {type: Boolean, default: false}, // 是否是公共仓库
  createDate: {type: Date, default: Date.now()}, // 创建时间
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

// 表字段验证规则
validate.add('name', {
  required: true,
  msg: '缺少仓库名称'
})

filter.add('name', 'trim')

MongooseValidateFilter.validateFilter(pictureStoreSchema, validate, filter)
mongoose.model('PictureStore', pictureStoreSchema)