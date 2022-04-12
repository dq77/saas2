import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

export const overStatus = [
  { label: '正常', value: '1' },
  { label: '已逾期', value: '2' }
]

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
  { label: '应收类型', key: 'receivableTypeName', width: 150 },
  { label: '应收名称', key: 'receivablePlanName', width: 150 },
  { label: '收款对象', key: 'customerName', width: 150 },
  { label: '款项编号', key: 'receivablePlanItemCode', width: 150 },
  { label: '款项类型', key: 'fundTypeName', width: 150 },
  { label: '计划应收时间', key: 'planEndDate', width: 150 },
  { label: '计划应收金额', key: 'receivableAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '已收金额', key: 'returnedAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '剩余未收金额', key: 'remainingAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '逾期金额', key: 'overdueAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '款项应收进度（%）', key: 'progressRatio', width: 150, render: (row, item) => item + '%' },
  { label: '款项应收状态', key: 'statusName', width: 150 },
  { label: '操作', key: 'operate', fixed: 'right', width: 80, options: [{ label: '详情' }] }
]
// 查询-form
export const formData = {
  receivablePlanName: undefined,
  receivableType: undefined,
  fundType: undefined,
  status: undefined,
  receivablePlanCode: undefined,
  receivablePlanItemCode: undefined,
  time: undefined,
  overdueStatus: undefined,
}
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'fundType', label: '款项类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
  { type: 'select', key: 'status', label: '款项应收状态', options: [], otherKeys: { label: 'statusName', value: 'statusCode' } },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'input', key: 'receivablePlanItemCode', label: '款项编号' },
  { type: 'datePicker', key: 'time', label: '计划应收时间', kind: 'daterange' },
  { type: 'select', key: 'overdueStatus', label: '款项是否逾期', options: overStatus },
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '计划应收时间', value: 'planEndDate' },
  { label: '计划应收金额', value: 'receivableAmount' },
  { label: '剩余未收金额', value: 'remainingAmount' },
  { label: '逾期金额', value: 'overdueAmount' }
]
