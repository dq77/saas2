import { toAmountStr } from '@/utils/util'

export const columns = [
  { label: '客户名称', key: 'customerName', fixed: 'left', minWidth: 140 },
  {
    label: '可用余额(元)',
    key: 'totalAmountAvailable',
    fixed: 'left',
    minWidth: 130,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true) || '- -'
  },
  {
    label: '冻结中金额(元)',
    key: 'totalAmountInFreeze',
    fixed: 'left',
    minWidth: 130,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true) || '- -'
  },
  {
    label: '账户总余额(元)',
    key: 'totalAmountBalance',
    fixed: 'left',
    minWidth: 130,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true) || '- -'
  },
  { label: '操作', key: 'operate', fixed: 'right', width: 150 },
]

export const formData = {
  customerName: undefined,
}

export const formConfig = [
  { type: 'input', key: 'customerName', label: '客户' }
]

export const statistics = [
  { label: '总可用余额(元)', number: '--', iconName: '22.png' },
  { label: '冻结中总金额(元)', number: '--', iconName: '23.png' },
  { label: '账户总余额(元)', number: '--', iconName: '25.png' },
]
