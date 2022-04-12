import { percent2 } from '@/utils/qjd'

// table - columns
export const columns = [
  { label: '收款对象', key: 'customerName' },
  { label: '应收计划数', key: 'receivablePlanCount' },
  { label: '应收款项数', key: 'receivablePlanItemCount' },
  { label: '应收总金额', key: 'receivableAmount', render: (row, item) => percent2(item) },
  { label: '已收总金额', key: 'returnedAmount', render: (row, item) => percent2(item) },
  { label: '剩余未收总金额', key: 'remainingAmount', width: 150, render: (row, item) => percent2(item) },
  { label: '逾期金额', key: 'overdueAmount', render: (row, item) => percent2(item) },
  { label: '逾期款项数', key: 'overdueCount' },
  { label: '操作', key: 'operate', options: [{ label: '查看' }] }
]
// formData
export const formData = { customerNameLike: undefined }
// formConfig
export const formConfig = [
  { type: 'input', key: 'customerNameLike', label: '收款对象' }
]
// 排序条件
export const options = [
  { label: '默认', value: 'createdTime' },
  { label: '应收总金额', value: 'receivableAmount' },
  { label: '剩余未收金额', value: 'remainingAmount' },
  { label: '逾期金额', value: 'overdueAmount' }
]
