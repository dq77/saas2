import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'
// table
export const columns = [
  { label: '应收编号', key: 'receivablePlanCode', width: 110 },
  { label: '应收类型', key: 'receivableTypeName' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '收款对象', key: 'customerName', width: 150 },
  { label: '款项编号', key: 'receivablePlanItemCode', width: 110 },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划应收时间', key: 'planEndDate', width: 150 },
  { label: '计划应收金额', key: 'receivableAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '已收金额', key: 'returnedAmount', render: (row, item) => percent2(item) },
  { label: '当前逾期金额', key: 'overdueAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '当前逾期天数', key: 'overdueDays', width: 150 },
]
// formData
export const formData = {
  receivablePlanName: undefined,
  receivablePlanCode: undefined,
  receivableType: undefined,
  fundType: undefined,
  plainTime: undefined,
  overdueDaysMax: undefined,
  overdueDaysMin: undefined,
  receivablePlanItemCode: undefined
}
// formConfig
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'fundType', label: '款项类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
  { type: 'input', key: 'receivablePlanItemCode', label: '款项编号' },
  { type: 'datePicker', key: 'plainTime', kind: 'daterange', label: '计划应收时间' },
  { type: null, key: 'overDays', label: '当前逾期天数', slotName: 'overDays' },
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '当前逾期天数', value: 'overdueDays' },
  { label: '当前逾期金额', value: 'overdueAmount' },
]
