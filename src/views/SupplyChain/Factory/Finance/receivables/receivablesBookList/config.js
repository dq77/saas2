import { receivableStatus } from '@/utils/enumsSaas'
import { toAmountStr } from '@/utils/util'

export const companyListData = [
  {
    label: '待核销应收笔数',
    content: '--',
    svgId: 'iconjine',
  },
  {
    label: '应收余额(元)',
    content: '--',
    svgId: 'iconlishi',
  },
]

export const columns = [
  { label: '应收创建时间', key: 'createdTime', minWidth: 140 },
  { label: '业务类型', key: 'a0', minWidth: 100, render: () => '销售发货' },
  { label: '应收单号', key: 'incomeSn', minWidth: 100 },
  {
    label: '应收金额(元)',
    key: 'incomeAmount',
    minWidth: 100,
    align: 'right',
    sortable: true,
    render: (row, value) => toAmountStr(value, 2, true)
  },
  {
    label: '应收余额(元)',
    key: 'incomeBalance',
    minWidth: 100,
    align: 'right',
    sortable: true,
    render: (row, value) => toAmountStr(value, 2, true)
  },
  { label: '状态', key: 'isCheck', minWidth: 100, render: (row, value) => receivableStatus[value] },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  dateRange: [],
  isCheck: null
}

const isCheckOptions = Object.keys(receivableStatus).map(key => {
  return {
    label: receivableStatus[key],
    value: key
  }
})

export const formConfig = [
  { type: 'datePicker', kind: 'daterange', key: 'dateRange', label: '应收创建时间', clearable: true },
  { type: 'select', key: 'isCheck', label: '状态', options: isCheckOptions, clearable: true }
]
