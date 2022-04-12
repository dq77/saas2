import { toAmountStr } from '@/utils/util'

export const columns = [
  { label: '客户名称', key: 'customerName', fixed: 'left', minWidth: 140 },
  {
    label: '对账周期',
    key: 'cycle',
    customHeader: 'cycleHeader',
    minWidth: 80,
  },
  {
    label: '待核销应收笔数(笔)',
    key: 'counts',
    minWidth: 100,
    sortable: true,
  },
  {
    label: '应收余额(元)',
    key: 'balance',
    minWidth: 100,
    align: 'right',
    sortable: true,
    render: (row, value) => toAmountStr(value, 2, true)
  },
  { label: '操作', key: 'operate', minWidth: 100 },
]

export const formData = {
  likeCustomerName: undefined,
}

export const formConfig = [
  { type: 'input', key: 'likeCustomerName', label: '客户名称', clearable: true }
]

export const statistics = [
  { label: '待核销总应收笔数(笔)', number: '--', iconName: '21.png' },
  { label: '待核销应收余额(元)', number: '--', iconName: '24.png' },
  { label: '待核销应收的客户数(个)', number: '--', iconName: '25.png' },
]
