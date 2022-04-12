import { accountCheckStatus } from '@/utils/enumsSaas'
import { toAmountStr, toDateStr, toPrefixUrl } from '@/utils/util'

export const fileUlr = toPrefixUrl('/saas-ofc/org/customerReceivablebill/downLoad')

export const companyListData = [
  {
    label: '待核销应收笔数(笔)',
    content: '--',
    svgId: 'iconjine',
  },
  {
    label: '应收余额(元)',
    content: '--',
    svgId: 'iconlishi',
  },
  {
    label: '对账周期',
    content: '--',
    slotContentName: 'cycle'
  },
]

export const columns = [
  {
    label: '对账单创建日期',
    key: 'createdTime',
    minWidth: 140,
    render: (row, value) => toDateStr(value, 'yyyy-MM-dd')
  },
  {
    label: '对账周期',
    key: 'cycle',
    minWidth: 200,
    render: (row, value) => `${toDateStr(row.cycleStartTime, 'yyyy-MM-dd')}至${toDateStr(row.cycleEndTime, 'yyyy-MM-dd')}`
  },
  { label: '对账单号', key: 'receivableSn', minWidth: 100 },
  {
    label: '期初余额(元)',
    key: 'openingBalance',
    minWidth: 100,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true)
  },
  {
    label: '本期金额(元)',
    key: 'amountsReceivable',
    minWidth: 100,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true)
  },
  {
    label: '期末余额(元)',
    key: 'closingBalance',
    minWidth: 100,
    align: 'right',
    render: (row, value) => toAmountStr(value, 2, true)
  },
  {
    label: '状态',
    key: 'status',
    minWidth: 100,
    render: (row, value) => accountCheckStatus[String(value)]
  },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  dateRange: [],
  status: '',
}

const statusOptions = Object.keys(accountCheckStatus).map(key => ({ label: accountCheckStatus[key], value: key }))

export const formConfig = [
  { type: 'datePicker', kind: 'daterange', key: 'dateRange', label: '对账单创建日期', clearable: true },
  { type: 'select', key: 'status', label: '状态', options: statusOptions, clearable: true },
]
