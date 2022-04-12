import { toAmountStr } from '@/utils/util'

export const columns = [
  { label: '申报时间', key: 'createdTime', sortable: 'custom', width: 140 },
  { label: '失效时间', key: 'validTo', sortable: 'custom', minWidth: 100 },
  { label: '客户', key: 'customerName', minWidth: 100 },
  { label: '授信类型', key: 'creditTypeName', width: 120 },
  { label: '授信状态', key: 'creditStatusName', width: 80 },
  { label: '授信额度', key: 'creditAmount', sortable: 'custom', minWidth: 100, align: 'right', render: (row, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '剩余额度', key: 'remainingAmount', minWidth: 80, align: 'right', render: (row, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '操作', key: 'operate', width: 250, fixed: 'right' },
]

export const cFormData = {
  customerName: undefined,
  creditStatus: undefined,
  time: undefined,
  creditType: undefined
}

export const cFormConfig = [
  { type: 'input', key: 'customerName', label: '客户名称' },
  { type: 'select', key: 'creditStatus', label: '授信状态', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
  { type: 'datePicker', key: 'time', label: '申报时间', kind: 'daterange' },
  { type: 'select', key: 'creditType', label: '授信类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' } },
]
