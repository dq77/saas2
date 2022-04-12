export const bondTypeList = [
  { key: '贷款转保证金', label: '贷款转保证金' },
  { key: '保证金转贷款', label: '保证金转贷款' },
  { key: '贷款转排产定金', label: '贷款转排产定金' },
  { key: '排产转贷款定金', label: '排产转贷款定金' },
  { key: '贷款转垫资', label: '贷款转垫资' },
  { key: '垫资转贷款', label: '垫资转贷款' },
  { key: '贷款转其他保证金', label: '贷款转其他保证金' },
  { key: '其他保证金转贷款', label: '其他保证金转贷款' },
]
// 还款状态
export const payStatus = [
  { value: 1, label: '待还款' },
  { value: 2, label: '已还款' }
]
// 系统日志分类
export const systemTabs = [
  { label: '系统日志', value: 'system' },
  { label: '错误处理', value: 'error' }
]
// 日志级别
export const logLevel = {
  INFO: '信息',
  ERROR: '错误'
}
// 发货单状态
export const invoiceStatusObj = {
  0: '未签收',
  1: '已签收'
}
// 正序、倒序
export const orderVals = {
  descending: 'desc',
  ascending: 'asc'
}
