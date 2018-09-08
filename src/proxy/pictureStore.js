/**
 * Created by Fizz on 2018/4/21.
 */
var PictureStore = require(MODELS).PictureStore

// 添加一条回答
exports.addOnePictureStore = (newPictureStore, cb) => {
  PictureStore.createOne(newPictureStore, cb)
}

// 查询回答
exports.queryPictureStores = (query, opt, cb) => {
  PictureStore
    .find(query, opt)
    .exec(cb)
}

// 分页查询回答
exports.queryPictureStoreByPage = function (query, opt, cb) {
  PictureStore
    .find(query)
    .skip(parseInt(opt.skip, 10))
    .limit(parseInt(opt.limit, 10))
    .exec(cb)
}

// 获取回答总条数
exports.countPictureStore = function (query, cb) {
  PictureStore
    .count(query)
    .exec(cb)
}

// 删除一个回答
exports.delOnePictureStore = function (query, cb) {
  PictureStore.removeOne(query, cb)
}

// 更新回答
exports.updateOnePictureStore = function (query, updateData, cb) {
  PictureStore.updateOne(query, updateData, cb)
}