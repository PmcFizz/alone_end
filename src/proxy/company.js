/**
 * Created by FizzPang on 2017/8/10.
 */
const Company = require(MODELS).Company

/**
 * @desc  add new company
 * @param newCompany : wait added company
 * @param cb : after add exec callback
 */
exports.addOneCompany = (newCompany, cb) => {
  Company.createOne(newCompany, cb)
}

/**
 * @desc  add new company
 * @param newCompanys : Array wait added
 * @param cb : after add exec callback
 */
exports.addManyCompanys = (newCompanys, cb) => {
  Company.create(newCompanys, cb)
}

/**
 * @desc  search company by query and opt
 * @param query : company.field
 * @param opt : opt.skip number;opt.limit number
 * @param cb : after search exec callback
 */
exports.queryCompanys = (query, opt, cb) => {
  Company
    .find(query, opt)
    .exec(cb)
}

/**
 * @desc  search company by page
 * @param query : company.field
 * @param opt : opt.skip number;opt.limit number;
 * @param cb : after search exec callback
 */
exports.queryCompanyByPage = (query, opt, cb) => {
  opt.limit = opt.limit ? opt.limit : 10
  Company
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

/**
 * @desc  search count
 * @param query : company.field
 * @param cb : after search exec callback
 */
exports.countCompany = (query, cb) => {
  Company
    .count(query)
    .exec(cb)
}

/**
 * @desc  find one company by query
 * @param query : _id
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.findOneCompany = (id, cb) => {
  Company.findById(id, cb)
}

/**
 * @desc  update one company by query
 * @param query : company.field
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.updateOneCompany = (query, updateData, cb) => {
  Company.updateOne(query, updateData, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.updateManyCompanys = (query, updateData, cb) => {
  Company.updateMany(query, updateData, {multi: true}, cb)
}

/**
 * @desc  delet one company  by query get
 * @param query : company.field
 * @param cb : after deletone exec callback
 */
exports.delOneCompany = (query, cb) => {
  Company.removeOne(query, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.delManyCompanys = (query, cb) => {
  Company.deleteMany(query, cb)
}