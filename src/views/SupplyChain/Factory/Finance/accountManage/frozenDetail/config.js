import { toAmountStr } from '@/utils/util'

export const formData = {
  daterange: undefined,
  status: undefined,
}

export const formConfig = [
  { type: 'datePicker', kind: 'daterange', key: 'daterange', label: '冻结时间', clearable: true },
]

export const columns = [
  { label: '冻结时间', key: 'createdTime', minWidth: 100 },
  { label: '账户', key: 'accountTypeName', minWidth: 100 },
  { label: '冻结金额(元)', key: 'remainFreeze', align: 'right', minWidth: 100, render: (row, v) => toAmountStr(v, 2, true) },
  // { label: '冻结原因', key: 'remark', minWidth: 150 },
]
