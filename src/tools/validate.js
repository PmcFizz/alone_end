/**
 *@description 验证用户名格式 3-16个字母或数字
 * @param str
 */
exports.isValidUsername = (str) => {
  const reg = /^[a-zA-Z0-9_]{3,16}$/
  return reg.test(str)
}

/**
 *@description 验证用户密码格式 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
 * @param str
 */
exports.isValidUserpwd = (str) => {
  const reg = /^[a-zA-Z0-9_]\w{5,17}$/
  return reg.test(str)
}

/**
 * @description 验证URL地址格式
 * @param str
 * @returns {boolean}
 */
exports.isValidUrl = (str) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

/**
 * @description 判断是否全部小写
 * @param str
 * @returns {boolean}
 */
exports.isLowerCase = (str) => {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全部大写
 * @param str
 * @returns {boolean}
 */
exports.isUpperCase = (str) => {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为字母
 * @param str
 * @returns {boolean}
 */
exports.isAlphabets = (str) => {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description 判断是否全为数字
 * @param str
 * @returns {boolean}
 */
exports.isDigital = (str) => {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/**
 * @description 判断是否为电话号码
 * @param str
 * @returns {boolean}
 */
exports.isPhoneNumber = (str) => {
  const reg = /^\d{11}$/
  return reg.test(str)
}

/**
 * @description 判断是否为邮箱
 * @param str
 * @returns {boolean}
 */
exports.isEmail = (str) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(str)
}

/**
 * @description 判断是否为身份证号
 * @param str
 * @returns {boolean}
 */
exports.isIDCardNo = (str) => {
  const reg = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/
  return reg.test(str)
}

/**
 * @description 判断是否为英文或数字
 * @param str
 * @returns {boolean}
 */
exports.isNumberOrCode = (str) => {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}