import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'
import { overStatus } from '../config'
// table - columns
export const columns = [
  { label: '应收编号', key: 'receivablePlanCode', width: 110 },
  { label: '应收类型', key: 'receivableTypeName' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '应收总金额', key: 'receivableAmount', render: (row, item) => percent2(item) },
  { label: '已收金额', key: 'returnedAmount', render: (row, item) => percent2(item) },
  { label: '最后应收时间', key: 'lastEndDate', width: 140 },
  { label: '剩余未收金额', key: 'remainingAmount', width: 140, render: (row, item) => percent2(item) },
  { label: '主计划逾期金额', key: 'overdueAmount', width: 140, render: (row, item) => percent2(item) },
  { label: '应收总进度', key: 'progressRatio', render: (row, item) => item + '%' },
  { label: '应收总状态', key: 'statusName' },
]
// formData
export const formData = {
  receivablePlanName: undefined,
  receivablePlanCode: undefined,
  receivableType: undefined,
  status: undefined,
  time: undefined,
  overdueStatus: undefined
}
// formConfig
export const formConfig = [
  { type: 'input', key: 'receivablePlanName', label: '应收名称' },
  { type: 'input', key: 'receivablePlanCode', label: '应收编号' },
  { type: 'select', key: 'receivableType', label: '应收类型', options: Object.keys(receiveTypes).map(key => ({ label: receiveTypes[key], value: key })) },
  { type: 'select', key: 'status', label: '应收总状态', options: [], otherKeys: { label: 'statusName', value: 'statusCode' } },
  { type: 'datePicker', key: 'time', kind: 'daterange', label: '最后应收时间' },
  { type: 'select', key: 'overdueStatus', label: '主计划是否逾期', options: overStatus },
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '最后应收时间', value: 'lastEndDate' },
  { label: '应收总金额', value: 'receivableAmount' },
  { label: '剩余未收金额', value: 'remainingAmount' },
  { label: '主计划逾期金额', value: 'overdueAmount' }
]
