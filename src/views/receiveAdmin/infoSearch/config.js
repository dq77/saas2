import { getDate, percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

// 应收总进度
const getPress = row => {
  const { returnedAmount, receivableAmount } = row
  if (receivableAmount === 0 || returnedAmount === 0) return '0.00'
  if (!receivableAmount || !returnedAmount) return 0
  const num = ((returnedAmount / receivableAmount) * 100).toFixed(2)
  return `${num || '0.00'}`
}
// 是否逾期
export const overdueStatusOptions = {
  1: '正常',
  2: '已逾期'
}
// 是否到期
export const expireStatusOptions = {
  0: '否',
  1: '是'
}
// table
export const columns = [
  { label: '应收编号', key: 'receivablePlanCode', width: 150 },
  { label: '应收内部编号', key: 'extPlanCode', width: 150 },
  { label: '应收类型', key: 'receivableType', width: 150, render: (row, item) => receiveTypes[item] ? receiveTypes[item] : '- -' },
  { label: '应收名称', key: 'receivablePlanName', width: 150 },
  { label: '收款对象', key: 'customerName', width: 150 },
  { label: '应收总金额', key: 'receivableAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '已收金额', key: 'returnedAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '应收总进度（%）', key: 'progress', width: 150, render: (row) => getPress(row) },
  { label: '应收总状态', key: 'statusName', width: 150 },
  { label: '最后应收时间', key: 'receivableEndDate', width: 150, render: (row, item) => item ? getDate(item) : '- -' },
  { label: '最近应收时间', key: 'recentlyReceivableDate', width: 150 },
  { label: '创建人', key: 'createdBy', width: 150 },
  { label: '创建时间', key: 'createdTime', width: 150, render: (row, item) => item ? getDate(item) : '- -' },
  { label: '操作', key: 'operate', fixed: 'right', width: 170 }
]
// 查询-form
export const formData = {
  receivablePlanName: undefined,
  customerName: undefined,
  extPlanCode: undefined,
  receivablePlanCode: undefined,
  receivableType: undefined,
  overdueStatus: undefined,
  status: undefined,
  isExpire: undefined
}
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'input', key: 'customerName', label: '收款对象' },
  { type: 'input', key: 'extPlanCode', label: '内部编号' },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'overdueStatus', label: '是否逾期', options: Object.keys(overdueStatusOptions).map(key => ({ label: overdueStatusOptions[key], value: key })) },
  { type: 'select', key: 'status', label: '应收总状态', options: [], otherKeys: { label: 'statusName', value: 'statusCode' } },
  { type: 'select', key: 'isExpire', label: '是否到期', options: Object.keys(expireStatusOptions).map(key => ({ label: expireStatusOptions[key], value: key })) }
]
// 筛选条件
export const options = [
  { label: '默认', value: 'created_time' },
  { label: '最后应收时间', value: 'receivable_end_date' },
  { label: '最近应收时间', value: 'recently_receivable_date' },
  { label: '计划应收金额', value: 'receivable_amount' }
]
