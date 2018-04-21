/**
 * Created by Fizz on 2016/12/5.
 */
var waitreplace = require(MODELS).waitreplace;

/**
 * @desc  add new waitreplace
 * @param newWaitreplace : wait added waitreplace
 * @param cb : after add exec callback
 */
exports.addOneWaitreplace = function (newWaitreplace, cb) {
    waitreplace.createOne(newWaitreplace, cb);
};

/**
 * @desc  search waitreplace by query and opt
 * @param query : waitreplace.field
 * @param opt : opt.skip number;opt.limit number
 * @param cb : after search exec callback
 */
exports.queryWaitreplaces = function (query, opt, cb) {
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
exports.queryWaitreplaceByPage = function (query, opt, cb) {
    waitreplace
        .find(query)
        .skip(parseInt(opt.skip,10))
        .limit(parseInt(opt.limit,10))
        .exec(cb)
};

/**
 * @desc  search count
 * @param query : waitreplace.field
 * @param cb : after search exec callback
 */
exports.countWaitreplace = function (query, cb) {
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
exports.findOneWaitreplace = function (id, data, cb) {
    waitreplace.findOne({_id:id}, data, cb);
};


/**
 * @desc  delet one waitreplace  by query get
 * @param query : waitreplace.field
 * @param cb : after deletone exec callback
 */
exports.delOneWaitreplace = function (query, cb) {
    waitreplace.removeOne(query, cb);
};

/**
 * @desc  update one waitreplace by query
 * @param query : waitreplace.field
 * @param updateData :wait update data
 * @param cb : after updateone exec callback
 */
exports.updateOneWaitreplace = function (query, updateData, cb) {
    waitreplace.updateOne(query, updateData, cb);
};