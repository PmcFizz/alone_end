/**
 * Created by FizzPang on 2017/8/10.
 */
const Evaluate = require(MODELS).Evaluate

/**
 * @desc  add new evaluate
 * @param newEvaluate : wait added evaluate
 * @param cb : after add exec callback
 */
exports.addOneEvaluate = (newEvaluate, cb) => {
  Evaluate.createOne(newEvaluate, cb)
}

/**
 * @desc  add new evaluate
 * @param newEvaluates : Array wait added
 * @param cb : after add exec callback
 */
exports.addManyEvaluates = (newEvaluates, cb) => {
  Evaluate.create(newEvaluates, cb)
}

/**
 * @desc  search evaluate by query and opt
 * @param query : evaluate.field
 * @param opt : opt.skip number;opt.limit number
 * @param cb : after search exec callback
 */
exports.queryEvaluates = (query, opt, cb) => {
  Evaluate
    .find(query, opt)
    .sort({createDate:-1})
    .exec(cb)
}

/**
 * @desc  search evaluate by page
 * @param query : evaluate.field
 * @param opt : opt.skip number;opt.limit number;
 * @param cb : after search exec callback
 */
exports.queryEvaluateByPage = (query, opt, cb) => {
  opt.limit = opt.limit ? opt.limit : 10
  Evaluate
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

/**
 * @desc  search count
 * @param query : evaluate.field
 * @param cb : after search exec callback
 */
exports.countEvaluate = (query, cb) => {
  Evaluate
    .count(query)
    .exec(cb)
}

/**
 * @desc  find one evaluate by query
 * @param query : _id
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.findOneEvaluate = (id, cb) => {
  Evaluate.findById(id, cb)
}

/**
 * @desc  update one evaluate by query
 * @param query : evaluate.field
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.updateOneEvaluate = (query, updateData, cb) => {
  Evaluate.updateOne(query, updateData, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.updateManyEvaluates = (query, updateData, cb) => {
  Evaluate.updateMany(query, updateData, {multi: true}, cb)
}

/**
 * @desc  delet one evaluate  by query get
 * @param query : evaluate.field
 * @param cb : after deletone exec callback
 */
exports.delOneEvaluate = (query, cb) => {
  Evaluate.removeOne(query, cb)
}

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.delManyEvaluates = (query, cb) => {
  Evaluate.deleteMany(query, cb)
}

// 获取评论作者
exports.queryEvaluateUser = (query, cb) => {
  Evaluate
    .findById(query)
    .populate('createUserId')
    .exec(cb)
}