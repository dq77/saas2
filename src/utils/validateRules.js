/*
* 特别注意：本文件记载通用校验规则，只校验当前值，无法与其他值同时校验。
* 特殊的校验规则，请写在组建中。
*/

// 验证手机号
export function vPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入手机号'))
  } else if (value && !/^1[0-9]{10}$/.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  } else {
    return callback()
  }
}

// 验证手机号，不校验必填
export function vPhone2(rule, value, callback) {
  if (!value) {
    return callback()
  } else if (value && !/^1[0-9]{10}$/.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  } else {
    return callback()
  }
}

// 验证身份证
export function vIdcardNumber(rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入身份证'))
  } else if (value && !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
    return callback(new Error('请输入正确身份证'))
  } else {
    return callback()
  }
}

// 验证邮箱
export function vEmail(rule, value, callback) {
  if (value && !/.+@.+\.\w+/.test(value)) {
    return callback(new Error('请输入正确的邮箱'))
  } else {
    return callback()
  }
}

// 验证密码规则
export function vPasswrod(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入新密码'))
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)) {
    callback(new Error('新密码必须8-32位，必须含 大、小写字母、数字'))
  }
  callback()
}

// 验证整数额度
export function vQuota(rule, value, callback) {
  if (value === null || value === '') {
    callback(new Error('请输入额度'))
  } else if (!/^\d+$/.test(value)) {
    callback(new Error('请输入整数额度'))
  }
  callback()
}

// 验证文件是否为空
export function vFile(rule, value, callback) {
  if (!value.length) {
    return callback(new Error('请选择文件'))
  } else {
    return callback()
  }
}
