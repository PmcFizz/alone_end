/**
 * Created by FizzPang on 2017/8/10.
 */

let mongoose = require('mongoose'),
  schema = mongoose.Schema,
  MongooseValidateFilter = require('mongoose-validatefilter'),
  validate = new MongooseValidateFilter.validate(),
  filter = new MongooseValidateFilter.filter()

const companySchema = new schema({
  name: String, // name
  createUserId: {type: schema.Types.ObjectId, ref: 'user'}, // create User ID
  createDate: {type: Date, default: Date.now()}, // create time
  status: {type: Number, default: 1}, // status
  lastModifiedDate: {type: Date, default: Date.now()} // the last modift time
})

validate.add('name', {
  require: true,
  msg: 'name is must defind'
})

filter.add('name', 'trim')
MongooseValidateFilter.validateFilter(companySchema, validate, filter)
mongoose.model('Company', companySchema)
