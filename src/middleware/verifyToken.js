const jwt = require('jsonwebtoken')
const tokenKey = require('../config/tokenKey')

function verifyToken (req, res, next) {
  var token = req.headers.accesstoken
  let key = tokenKey.publicKey
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      RETURNFAIL(res, {errmsg: '没有登录'})
    } else {
      next()
    }
  })
}

module.exports = verifyToken