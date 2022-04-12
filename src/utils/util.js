import { baseUrl } from '@/utils/config'
import { processEnums } from '@/utils/enumsTag'

// 可将数字字符串转换为带逗号的数字字符串，并可指定要保留的小数位
export function toAmountStr(v, deci, withThousand, isTenThousand) {
  const _withThousand = deci === true || withThousand === true
  if (v !== undefined && v !== null) {
    v = Number(v)
    if (deci >= 0) {
      if (!isTenThousand) {
        const str = v.toFixed(deci)
        const arr = str.split('.')
        if (_withThousand) {
          if (arr.length === 2) {
            return `${Number(arr[0]).toLocaleString()}.${arr[1]}`
          } else {
            return Number(arr[0]).toLocaleString()
          }
        } else {
          return str
        }
      } else {
        if (v === 0) {
          return '0'
        } else if (v < 100) {
          return '0.01'
        } else {
          return (v / 10000).toFixed(deci)
        }
      }
    } else {
      return _withThousand ? v.toLocaleString() : v.toString()
    }
  } else {
    return ''
  }
}

// 将url加上环境的前缀
export function toPrefixUrl(url) {
  return baseUrl + url
}

// 时间格式化
export function toDateStr(str, fmt) {
  function compatibleTime(str) {
    str = str.replace(/-/ig, '/')
    if (str.substr(str.length - 1).toUpperCase() === 'Z' || str.indexOf('.000+0000') > -1) {
      var h
      str.replace(/z/ig, '').replace(/(.*).000+0000/, '')
      var regH = /(T| )(\d\d:\d\d:\d\d)(\.\d+)?/
      h = str.match(regH)
      h = h && h[2]
      str = new Date(Date.parse(str.slice(0, str.indexOf('T')) + ' ' + h)).getTime() + 8 * 60 * 60 * 1000
      return str
    }
    return str.replace(/T/g, ' ')
  }
  var o, d
  if (str instanceof Date) {
    d = str
  } else if (str === '' || str === null || str === undefined) {
    return ''
  } else if (str > 0 || str <= 0) { // 兼容后端返回 字符串 的 数字时间戳
    d = new Date(Number(str))
  } else {
    // debugger
    str = compatibleTime(str)
    d = new Date(str)
  }
  o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    S: d.getMilliseconds() // 毫秒
  }
  if (fmt) {
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}

// 字段较长的省份名称缩写
export function toAreaName(value) {
  value || (value = '无区域信息')
  let name
  value = value ? value === '其他省份' ? value : value.replace(/省|市/, '') : null
  switch (value) {
    case '新疆维吾尔自治区':
      name = '新疆'
      break
    case '内蒙古自治区':
      name = '内蒙古'
      break
    case '西藏自治区':
      name = '西藏'
      break
    case '宁夏回族自治区':
      name = '宁夏'
      break
    case '广西壮族自治区':
      name = '广西'
      break
    case '香港特别行政区':
      name = '香港'
      break
    case '澳门特别行政区':
      name = '澳门'
      break
    default:
      name = value
      break
  }
  return name
}

// 将数字金额转换为繁体
export function convertCurrency(n) {
  const fraction = ['角', '分']
  const digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  const unit = [
    ['圆', '万', '亿', '万亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = n < 0 ? '负' : ''
  let n2 = n
  n2 = Math.abs(n)
  if (n2.toString() === 'NaN') return false
  let s = ''
  fraction.forEach((item, i) => {
    s += (digit[Math.floor(n2 * 10 * (10 ** i)) % 10] + fraction[i]).replace(/零./, '')
  })
  s = s || '整'
  n2 = Math.floor(n2)
  unit[0].forEach((frist) => {
    if (n2 > 0) {
      let p = ''
      unit[1].forEach((second) => {
        if (n2 > 0) {
          p = digit[n2 % 10] + second + p
          n2 = Math.floor(n2 / 10)
        }
      })
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + frist + s
    }
  })
  let result = head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整') // (零.)匹配零后边任意字符 如：零佰零千
  if (/(万亿)\S*(亿)/.test(result)) {
    result = result.replace(/万亿/, '万')
  }
  return result
}
// 数字转换为文字
export function numberToChinese(number) {
  const units = '个十百千万@#%亿^&~'
  const chars = '零一二三四五六七八九'
  const a = (number + '').split('')
  const s = []
  const t = this
  if (a.length > 12) {
    throw new Error('Number too big!')
  } else {
    for (var i = 0, j = a.length - 1; i <= j; i++) {
      if (j === 1 || j === 5 || j === 9) { // 两位数 处理特殊的 1*
        if (i === 0) {
          if (a[i] !== '1') s.push(chars.charAt(a[i]))
        } else {
          s.push(chars.charAt(a[i]))
        }
      } else {
        s.push(chars.charAt(a[i]))
      }
      if (i !== j) {
        s.push(units.charAt(j - i))
      }
    }
  }
  return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) { // 优先处理 零百 零千 等
    b = t.units.indexOf(d)
    if (b !== -1) {
      if (d === '亿') return d
      if (d === '万') return d
      if (a[j - b] === '0') return '零'
    }
    return ''
  }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
    return b
  }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
    return { '@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千' }[m]
  }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
    c = t.units.indexOf(d)
    if (c !== -1) {
      if (a[j - c] === '0') return d + '零' + b
    }
    return m
  })
}

// 判断数组是否有重复
export function isRepeat(arr) {
  var hash = {}
  for (var i in arr) {
    if (hash[arr[i]]) { return true }
    hash[arr[i]] = true
  }
  return false
}

// 深度拷贝
export function deepCopy(p, c) {
  c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object' && p[i]) {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}
export function validateIdentifyCode(code) {
  if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    return false
  } else {
    if (code.length === 18) {
      code = code.split('')
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      var sum = 0
      var ai = 0
      var wi = 0
      for (var i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      if (code[17] === 'x') code[17] = code[17].toUpperCase()
      if (parity[sum % 11].toString() !== code[17]) {
        return false
      }
    }
  }
  return true
}

// 设置cookie
export function setCookie(key, value) {
  var exdate = new Date() // 获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 36500) // 保存的天数，我这里写的是100年
  // 字符串拼接cookie
  window.document.cookie = key + '=' + value + ';path=/;expires=' + exdate.toGMTString()
}
// 读取cookie
export function getCookie(param) {
  var cParam = ''
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=') // 再次切割
      // 判断查找相对应的值
      if (arr2[0] === param) {
        cParam = arr2[1]
        // 保存到保存数据的地方
      }
    }
    return cParam
  }
}
// 获取当前月份的第一天
export function getCurrentMonthFirst(time) {
  var date = time || new Date()
  date.setDate(1)
  var month = parseInt(date.getMonth() + 1)
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}
// 获取当前月份的最后一天
export function getCurrentMonthLast(time) {
  var date = time || new Date()
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  var lastTime = new Date(nextMonthFirstDay - oneDay)
  var month = parseInt(lastTime.getMonth() + 1)
  var day = lastTime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}

export function sendTrackUser(params) {
  window.error('此方法已废弃，请执行window.weblogs.getHelp获取帮助')
  // if (!window.weblogs) return
  // try {
  //   window.weblogs && window.weblogs.sendTrackUserMessage({
  //     method: 'self-button',
  //     element: params.element || window.location.pathname,
  //     target: params.target,
  //     result: JSON.stringify(params.result || '')
  //   })
  // } catch (e) {
  //   console.error(e)
  // }
}

// 驼峰转下划线
export function humpToLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 下划线转驼峰
export function lineToHump(name) {
  return name.replace(/_(\w)/g, function (match, letter) {
    return letter.toUpperCase()
  })
}

/**
* 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
**/

export function isNumber(val) {
  var regPos = /^[0-9]+.?[0-9]*/ // 判断是否是数字。
  return !!regPos.test(val)
}

// 渲染模型相关字段
export function renderModelItem(item, key) {
  let modelCreditGrade
  let modelResultTime
  // let creditSuggest
  // if (!item.realControllerId) {
  //   modelCreditGrade = '信息缺失'
  //   modelResultTime = '-'
  //   creditSuggest = '-'
  // } else
  if (!item.modelResultTime) {
    if (!item.realControllerId) {
      modelCreditGrade = '信息不足'
      modelResultTime = '-'
      // creditSuggest = '-'
    } else {
      modelCreditGrade = '生成中'
      modelResultTime = '-'
      // creditSuggest = '生成中'
    }
  }
  // else if (item.creditSuggestLower === null || item.creditSuggestUpper === null) {
  //   modelCreditGrade = item.realControllerId ? `${item.modelCreditGrade}` : `${item.modelCreditGrade}(信息不足)`
  //   modelResultTime = toDateStr(item.modelResultTime, 'yyyy-MM-dd')
  //   creditSuggest = '-'
  // } else {
  //   modelCreditGrade = item.realControllerId ? `${item.modelCreditGrade}` : `${item.modelCreditGrade}(信息不足)`
  //   modelResultTime = toDateStr(item.modelResultTime, 'yyyy-MM-dd')
  //   if (item.creditSuggestLower === 0 && item.creditSuggestUpper === 0) {
  //     creditSuggest = '不建议准入'
  //   } else {
  //     creditSuggest = item.creditSuggestLower === item.creditSuggestUpper ? `${toAmountStr(item.creditSuggestLower, 0, true, true)}万元` : `${toAmountStr(item.creditSuggestLower, 0, true, true)}-${toAmountStr(item.creditSuggestUpper, 0, true, true)}万元`
  //   }
  // }
  if (item.errorReason) {
    modelCreditGrade = '-'
    modelResultTime = '-'
    // creditSuggest = '-'
  }
  switch (key) {
    case 'modelCreditGrade':
      return modelCreditGrade
    case 'modelResultTime':
      return modelResultTime
    // case 'creditSuggest':
    //   return creditSuggest
  }
}

// 渲染模型相关字段，新版，将字段拆分
// 使用时，level,quota,ranking优先判断status，为空表示其他值可用
/*
诚信模型状态梳理
----------------------------------------------------------------------------------------
                    status     当前诚信等级     额度建议区间   排名      描述
未生成               0          信息不足        -             -         信息不足
第一次生成中          1          生成中          -             -         生成中
第二次生成中
  已生成没有三要素    2          等级（信息不足） 区间          排名      信息不足
  已生成有三要素      3          上次等级        上次区间      上次排名   等级描述
已生成没有三要素      4          等级（信息不足） 区间          排名      信息不足
已生成有三要素        5          当前等级        区间          排名      等级描述
已生成               6                                               请更新模型

配置了区间           0          不变            不变          不变       不变
未配置区间           1          不变            -            不变       不变
额度区间0-0          2          不变           不建议准入     不变      不建议准入
额度区间相同         3          不变            xx万元        不变       不变
*/
export function filterGradeInfo(company) {
  const res = {
    status: 0,
    rangeStatus: 0,
    level: '',
    rangeStart: '',
    rangeEnd: '',
    ranking: '',
    describe: ''
  }
  const describes = {
    B: '整体实力不足，建议慎重考虑是否合作',
    BB: '实力、经营能力风险较高，履约意愿及能力较弱，建议重点关注合作动态',
    BBB: '实力、经营能力一般；履约意愿及能力一般',
    A: '实力、经营能力良好；履约意愿及能力良好',
    AA: '实力、经营能力优秀；履约意愿及能力较强',
    AAA: '实力、经营能力极佳；履约意愿及能力优秀'
  }
  const describeNoInfo = '需补充客户三要素：实控人姓名、手机号、身份证号，方可获得价值等级'
  res.describeNoInfo = describeNoInfo
  if (!company.modelResultTime) { // 未生成过
    if (!company.realControllerId) { // 未生成 0
      res.status = 0
      res.describe = describeNoInfo
    } else { // 第一次生成中 1
      res.status = 1
      res.describe = '生成中'
    }
  } else { // 已生成过
    if (company.realControllerId) { // 已生成有三要素 5
      res.status = 5
      res.level = company.modelCreditGrade
      res.ranking = (company.ranking * 100).toFixed(0)
      res.describe = describes[company.modelCreditGrade]
    } else { // 已生成没有三要素 4
      res.status = 4
      res.level = company.modelCreditGrade
      res.ranking = (company.ranking * 100).toFixed(0)
      res.describe = describeNoInfo
    }
    if (company.creditSuggestLower === null || company.creditSuggestUpper === null) {
      res.rangeStatus = 1
    } else if (company.creditSuggestLower === 0 || company.creditSuggestUpper === 0) {
      res.describe = '不建议准入'
      res.rangeStatus = 2
    } else if (company.creditSuggestLower === company.creditSuggestUpper) {
      res.rangeStatus = 3
    } else {
      res.rangeStart = toAmountStr(company.creditSuggestLower, 0, true, true)
      res.rangeEnd = toAmountStr(company.creditSuggestUpper, 0, true, true)
      res.rangeStatus = 0
    }
    if (new Date(company.modelResultTime).getTime() < new Date('2021-12-14 17:00:00').getTime()) {
      res.status = 6
      res.describe = '模型更新后，原来的等级无法进行展示，请重新跑模型以获取新的模型结果。'
    }
  }
  return res
}
// 用于关键字脱敏，将中间字符替换为*
export function toWordHide(v, type, startLength, endLength) {
  if (type === 'mobile') {
    startLength = 3
    endLength = 3
  } else if (type === 'name') {
    startLength = 1
    endLength = v.length > 2 ? 1 : 0
  } else if (type === 'id') {
    startLength = 6
    endLength = 4
  } else if (type === 'bank') {
    startLength = 4
    endLength = 4
  }
  if (v !== undefined && v !== null) {
    v = v.toString()
    const pat = new RegExp('(\\S{' + startLength + '})\\S*(\\S{' + endLength + '})')
    return v.replace(pat, '$1****$2')
  } else {
    return ''
  }
}

// 用于固定长度后加省略号
export function overHide(v, length) {
  if (v !== undefined && v !== null) {
    v = v.toString()
    if (v.length > length) {
      return v.substring(0, length) + '...'
    } else {
      return v
    }
  } else {
    return ''
  }
}
// 验证手机号
export function validatePhone(value) {
  return /^1[0-9]{10}$/.test(value)
}

// 验证邮箱
export function validateEmail(value) {
  // return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
  return /^[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(value)
}

// 处理待处理跳转参数
export function handleProcessEnums(row) {
  const { id } = row.commonBusVars || {}
  if (row.processDefinitionKey === 'orderProcess' && row.taskName === '待审核') {
    return { name: 'orderAudit' }
  } else if (['supplementaryAssessRisk', 'creditAccurateRisk'].indexOf(row.processDefinitionKey) >= 0) {
    // supplementaryAssessRisk 赊销精准评估补充资料, creditAccurateRisk 赊销精准评估驳回
    if (row.commonBusVars.riskFlag === 1) {
      return {
        name: 'accurateAuth',
        query: {
          taskId: id,
          mode: 'ACCURATE_MODE'
        }
      }
    } else {
      return {
        name: 'uploadMaterials',
        query: {
          id: id,
          mode: 'accurate'
        }
      }
    }
  }
  const processConfig = processEnums[row.processDefinitionKey]
  if (processConfig) {
    const params = {
      name: processConfig.name,
      query: {}
    }
    const querys = {}
    processConfig.keys.length && processConfig.keys.forEach(item => {
      if (row[item]) {
        querys[item] = row[item]
      } else {
        if (item === 'id') {
          querys[item] = id
        } else if (item === 'editFlag') {
          row.taskName === '待审核' && (querys[item] = 'audit')
          row.taskName !== '待审核' && (querys[item] = 'detail')
        } else if (item === 'default') {
          querys[item] = processConfig.defaultParams
        }
      }
    })
    params.query = querys

    return params
  }
}

// 关键词红色标记显示
export function renderKeyWords(content, keyWords) {
  const str = keyWords.replace(/([*.?+$^(){}|\\/])/g, '\\$1')
  const rep = new RegExp(str, 'g')
  const resDtring = `<span style='color:red;'>${keyWords}</span>`
  return content.replace(rep, resDtring)
}
// formHooks用来转换对象枚举到查询条件options数据类型
export function getOptionsByObj(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return []
  return Object.keys(obj).map(key => ({ label: obj[key], value: key }))
}

export function debounce(fn, wait = 1000) {
  let timer = null
  const run = function () {
    const args = Array.from(arguments)
    if (timer) window.clearTimeout(timer)

    timer = window.setTimeout(() => {
      fn.apply(this, args)
      window.clearTimeout(timer)
    }, wait)
  }
  return run
}
