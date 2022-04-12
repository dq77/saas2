import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

// table
export const columns = [
  { label: '应收编号', key: 'receivablePlanCode', width: 150 },
  { label: '应收类型', key: 'receivableTypeName', width: 150 },
  { label: '应收名称', key: 'receivablePlanName', width: 150 },
  { label: '收款对象', key: 'customerName', width: 150 },
  { label: '款项编号', key: 'receivablePlanItemCode', width: 150 },
  { label: '款项类型', key: 'fundTypeName', width: 150 },
  { label: '计划应收时间', key: 'planEndDate', width: 150 },
  { label: '计划应收金额', key: 'receivableAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '收款来源', key: 'repaymentType', width: 150 },
  { label: '收款时间', key: 'repaymentTime', width: 150 },
  { label: '收款金额', key: 'repaymentAmount', render: (row, item) => percent2(item) },
  { label: '操作', key: 'operate', fixed: 'right', width: 80, options: [{ label: '详情' }] }
]
// formData
export const formData = {
  receivablePlanName: undefined,
  receivablePlanCode: undefined,
  receivableType: undefined,
  fundType: undefined,
  plainTime: undefined,
  receiveTime: undefined,
  receivableplanItemCode: undefined
}
// formConfig
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'fundType', label: '款项类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
  { type: 'input', key: 'receivableplanItemCode', label: '款项编号' },
  { type: 'datePicker', key: 'plainTime', kind: 'daterange', label: '计划应收时间' },
  { type: 'datePicker', key: 'receiveTime', kind: 'daterange', label: '收款时间' },
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '计划应收时间', value: 'planEndDate' },
  { label: '收款时间', value: 'repaymentTime' },
  { label: '计划应收金额', value: 'receivableAmount' },
  { label: '收款金额', value: 'repaymentAmount' }
]
