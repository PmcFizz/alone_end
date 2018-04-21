/**
 * Created by FizzPang on 2017/8/10.
 */
const waitreplace = require(MODELS).waitreplace;

/**
 * @desc  add new waitreplace
 * @param newWaitreplace : wait added waitreplace
 * @param cb : after add exec callback
 */
exports.addOneWaitreplace = (newWaitreplace, cb) => {
    waitreplace.createOne(newWaitreplace, cb);
};

/**
 * @desc  add new waitreplace
 * @param newWaitreplaces : Array wait added
 * @param cb : after add exec callback
 */
exports.addManyWaitreplaces = (newWaitreplaces, cb) => {
    waitreplace.create(newWaitreplaces, cb);
};

/**
 * @desc  search waitreplace by query and opt
 * @param query : waitreplace.field
 * @param opt : opt.skip number;opt.limit number
 * @param cb : after search exec callback
 */
exports.queryWaitreplaces = (query, opt, cb) => {
    waitreplace
        .find(query, opt)
        .exec(cb);
};

/**
 * @desc  search waitreplace by page
 * @param query : waitreplace.field
 * @param opt : opt.skip number;opt.limit number;
 * @param cb : after search exec callback
 */
exports.queryWaitreplaceByPage = (query, opt, cb) => {
    opt.limit = opt.limit ? opt.limit : 10;
    waitreplace
        .find(query)
        .skip(parseInt(opt.skip, 10))
        .limit(parseInt(opt.limit, 10))
        .exec(cb)
};

/**
 * @desc  search count
 * @param query : waitreplace.field
 * @param cb : after search exec callback
 */
exports.countWaitreplace = (query, cb) => {
    waitreplace
        .count(query)
        .exec(cb)
};

/**
 * @desc  find one waitreplace by query
 * @param query : _id
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.findOneWaitreplace = (id, cb) => {
    waitreplace.findById(id, cb);
};

/**
 * @desc  update one waitreplace by query
 * @param query : waitreplace.field
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.updateOneWaitreplace = (query, updateData, cb) => {
    waitreplace.updateOne(query, updateData, cb);
};

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.updateManyWaitreplaces = (query, updateData, cb) => {
    waitreplace.updateMany(query, updateData, {multi: true}, cb);
};

/**
 * @desc  delet one waitreplace  by query get
 * @param query : waitreplace.field
 * @param cb : after deletone exec callback
 */
exports.delOneWaitreplace = (query, cb) => {
    waitreplace.removeOne(query, cb);
};

/**
 *update many data
 * @param {Object} conditions
 * @param {Object} updateData
 * @param {Function} [cb]
 * @return {Query}
 * @api public
 */
exports.delManyWaitreplaces = (query, cb) => {
    waitreplace.deleteMany(query, cb);
};