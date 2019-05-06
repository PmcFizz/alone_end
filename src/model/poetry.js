/**
 * Created by Fizz on 2019年5月6日14:27:34
 * 问题数据模型
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let MongooseValidateFilter = require('mongoose-validatefilter')
let validate = new MongooseValidateFilter.validate()
let filter = new MongooseValidateFilter.filter()

let poetrySchema = new Schema({
  title: String, // 诗的标题
  content: Array, // 诗的内容
  author: String, // 诗的作者
  createDate: {type: Date, default: Date.now()}, // 创建时间
  lastModifyDate: {type: Date, default: Date.now()} // 最后修改时间
})

filter.add('title', 'trim')

MongooseValidateFilter.validateFilter(poetrySchema, validate, filter)
mongoose.model('Poetry', poetrySchema)