import { receiveTypes } from '@/consts/receive'
import { percent2 } from '@/utils/qjd'
import { overStatus } from '../config'
// table - columns
export const columns = [
  { label: '应收编号', key: 'receivablePlanCode', width: 110 },
  { label: '应收类型', key: 'receivableTypeName' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '款项编号', key: 'receivablePlanItemCode', width: 110 },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划应收时间', key: 'planEndDate', width: 150 },
  { label: '计划应收金额', key: 'receivableAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '已收金额', key: 'returnedAmount', render: (row, item) => percent2(item) },
  { label: '剩余未收金额', key: 'remainingAmount', width: 140, render: (row, item) => percent2(item) },
  { label: '逾期金额', key: 'overdueAmount', render: (row, item) => percent2(item) },
  { label: '款项应收进度', key: 'progressRatio', width: 150, render: (row, item) => item + '%' },
  { label: '款项应收状态', key: 'statusName', width: 150 },
]
// formData
export const formData = {
  receivablePlanName: undefined,
  receivablePlanCode: undefined,
  receivableType: undefined,
  fundType: undefined,
  time: undefined,
  overdueStatus: undefined,
  status: undefined,
}
// formConfig
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'fundType', label: '款项类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
  { type: 'datePicker', key: 'time', kind: 'daterange', label: '计划应收时间' },
  { type: 'select', key: 'overdueStatus', label: '款项是否逾期', options: overStatus },
  { type: 'select', key: 'status', label: '款项应收状态', options: [], otherKeys: { label: 'statusName', value: 'statusCode' } },
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '计划应收时间', value: 'planEndDate' },
  { label: '计划应收金额', value: 'receivableAmount' },
  { label: '剩余未收金额', value: 'remainingAmount' },
  { label: '逾期金额', value: 'overdueAmount' }
]
