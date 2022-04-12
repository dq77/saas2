import { toAmountStr } from '@/utils/util'
import { enterAccountBillStatus } from '@/utils/enumsSaas'

export const companyListData = [
  {
    label: '历史入账总笔数',
    content: '2333',
    svgId: 'iconzongshu',
  },
  {
    label: '历史入账总金额(元)',
    content: '2333',
    svgId: 'iconlishi',
  },
  {
    label: '待确认入账笔数',
    content: '2333',
    svgId: 'iconqueren',
  },
  {
    label: '待确认入账金额(元)',
    content: '2333',
    svgId: 'iconchuzhang',
  },
]

export const columns = [
  { label: '入账单创建时间', key: 'createdTime', minWidth: 100 },
  { label: '入账客户', key: 'customerName', minWidth: 160 },
  { label: '入账单号', key: 'billNo', minWidth: 200 },
  { label: '入账金额(元)', key: 'amount', minWidth: 100, align: 'right', render: (row, value) => toAmountStr(value, 2, true) },
  { label: '状态', key: 'status', minWidth: 60, render: (row, value) => enterAccountBillStatus[value] },
  { label: '操作人', key: 'modifierByName', minWidth: 80 },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  daterange: undefined,
  billNo: undefined,
  status: undefined,
}

const accountStatusOptions = Object.keys(enterAccountBillStatus).map(key => {
  return {
    label: enterAccountBillStatus[key],
    value: key
  }
})

export const formConfig = [
  { type: 'datePicker', kind: 'daterange', key: 'daterange', label: '入账单创建时间', clearable: true },
  { type: 'input', key: 'billNo', label: '入账单号', clearable: true },
  { type: 'select', key: 'status', label: '状态', options: accountStatusOptions, clearable: true },
]
