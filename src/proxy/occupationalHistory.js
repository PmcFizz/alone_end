/**
 * Created by FizzPang on 2017/8/10.
 */
const OccupationalHistory = require(MODELS).OccupationalHistory

/**
 * @desc  add new occupationalHistory
 * @param newOccupationalHistory : wait added occupationalHistory
 * @param cb : after add exec callback
 */
exports.addOneOccupationalHistory = (newOccupationalHistory, cb) => {
  OccupationalHistory.createOne(newOccupationalHistory, cb)
}

/**
 * @desc  add new occupationalHistory
 * @param newOccupationalHistorys : Array wait added
 * @param cb : after add exec callback
 */
exports.addManyOccupationalHistorys = (newOccupationalHistorys, cb) => {
  OccupationalHistory.create(newOccupationalHistorys, cb)
}

/**
 * @desc  search occupationalHistory by query and opt
 * @param query : occupationalHistory.field
 * @param opt : opt.skip number;opt.limit number
 * @param cb : after search exec callback
 */
exports.queryOccupationalHistorys = (query, opt, cb) => {
  OccupationalHistory
    .find(query, opt)
    .exec(cb)
}

/**
 * @desc  search occupationalHistory by page
 * @param query : occupationalHistory.field
 * @param opt : opt.skip number;opt.limit number;
 * @param cb : after search exec callback
 */
exports.queryOccupationalHistoryByPage = (query, opt, cb) => {
  opt.limit = opt.limit ? opt.limit : 10
  OccupationalHistory
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

/**
 * @desc  search count
 * @param query : occupationalHistory.field
 * @param cb : after search exec callback
 */
exports.countOccupationalHistory = (query, cb) => {
  OccupationalHistory
    .count(query)
    .exec(cb)
}

/**
 * @desc  find one occupationalHistory by query
 * @param query : _id
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.findOneOccupationalHistory = (id, cb) => {
  OccupationalHistory.findById(id, cb)
}

/**
 * @desc  update one occupationalHistory by query
 * @param query : occupationalHistory.field
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.updateOneOccupationalHistory = (query, updateData, cb) => {
  OccupationalHistory.updateOne(query, updateData, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.updateManyOccupationalHistorys = (query, updateData, cb) => {
  OccupationalHistory.updateMany(query, updateData, {multi: true}, cb)
}

/**
 * @desc  delet one occupationalHistory  by query get
 * @param query : occupationalHistory.field
 * @param cb : after deletone exec callback
 */
exports.delOneOccupationalHistory = (query, cb) => {
  OccupationalHistory.removeOne(query, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.delManyOccupationalHistorys = (query, cb) => {
  OccupationalHistory.deleteMany(query, cb)
}