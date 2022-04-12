import cloneDeep from 'lodash/cloneDeep'
import { toAmountStr, toPrefixUrl } from '../util'
// 还款周期天数
export const payCycleValidator = (rule, value, callback) => {
  if (isNaN(value)) {
    callback(new Error('必须为数字'))
  } else if (value <= 0) {
    callback(new Error('必须大于0天'))
  } else if (!/^\d+$/.test(value)) {
    callback(new Error('请输入整数天数'))
  } else {
    callback()
  }
}
// 深拷贝
export const deepCopy = cloneDeep
// 保留两位小数
export const percent2 = val => val || val === 0 ? toAmountStr(val, 2, true) : '- -'
// 大写转下划线
export const uppertoline = val => {
  if (!val) return ''
  const arr = []
  val.split('').forEach(item => {
    if (/[A-Z]+/.test(item)) {
      arr.push('_' + item.toLowerCase())
    } else {
      arr.push(item)
    }
  })
  return arr.join('')
}
// 获取省市区label
export const getLabels = (codes, options, labels = []) => {
  if (!codes || !options) return []
  options.forEach(item => {
    if (codes.includes(item.code)) {
      labels.push(item)
      return getLabels(codes, item.children, labels)
    }
  })
  return labels
}
// uuid
export const uuid = () => {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}
// 是否为对象
export const isObject = val => val !== null && typeof val === 'object'
// 获取年月日，录入日期格式为： 2021-01-01 19:01:01
export const getDate = val => val?.split(' ')?.[0] ?? '- -'
// 获取父级容器id，默认获取右侧内容区域滚动容器(即面包屑所在区域)
export const getWraper = (parentId = null) => {
  let wraper
  const wrapers = document.querySelectorAll('.el-scrollbar__wrap')
  wrapers.forEach((item) => {
    if (item.parentNode.id === (parentId || 'content_view')) wraper = item
  })
  return wraper
}
// 内容区滚动到固定位置
export const scrollHandle = (parentId = null, top = 0) => {
  const wraper = getWraper(parentId)
  wraper && wraper.scrollTo({ top })
}
// 查询默认第一个菜单
export const findDefaultMenu = data => {
  if (!data) return {}
  let menu
  const customReduce = data => {
    if (data?.subMenu?.length) {
      customReduce(data?.subMenu?.[0])
    } else {
      menu = data
    }
  }
  customReduce(data)
  return menu
}
// 获取开始结束时间，针对范围时间选择器
export const getDaterange = value => {
  if (!value) return {}
  const [start, end] = value
  return {
    start,
    end
  }
}
// 正数+号
export const getPosNUm = num => {
  num = num || 0
  return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2)
}
// 获取正负数颜色
export const getPosColor = num => {
  num = num || 0
  return num > 0 ? 'green' : num < 0 ? 'red' : ''
}
// 获取年月日
export const getFullDate = () => {
  const date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month.toString().length > 9 ? month : `0${month}`
  day = day.toString().length > 9 ? day : `0${day}`
  return {
    year: date.getFullYear(),
    month,
    day
  }
}

// 预览
export const preview = res => {
  const { key } = res?.response ?? {}
  window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
}

// 枚举数据转变为select option数据
export const enumToOption = (obj) => {
  return Object.keys(obj).map(key => {
    return {
      label: obj[key],
      value: key
    }
  })
}
