import { accountBusinessType, accountInvoiceType } from '@/utils/enumsSaas'
import { toAmountStr } from '@/utils/util'

export const companyListData = [
  {
    label: '账户总余额(元)',
    content: '- -',
    svgId: 'iconlishi',
  },
  {
    label: '可用余额(元)',
    content: '- -',
    svgId: 'iconchuzhang',
  },
  {
    label: '冻结中金额(元)',
    content: '- -',
    svgId: 'icondongjie',
    link: {
      name: 'supplyChain_factory_finance_frozenDetail',
      query: {
        customerId: null,
        customerName: null,
      }
    }
  },
]

export const tabs = [
  {
    name: 'account0',
    label: '基本账户',
    totalData: { label: '总余额(元)', content: '22334' },
    accountsData: [
      { label: '可用余额(元)', content: '214442' },
      { label: '冻结中金额(元)', content: '214442' }
    ]
  },
  {
    name: 'account1',
    label: '自定义账户1',
    totalData: { label: '总余额(元)', content: '22334' },
    accountsData: [
      { label: '可用余额(元)', content: '2222' },
      { label: '冻结中金额(元)', content: '3333' }
    ]
  },
  {
    name: 'account2',
    label: '自定义账户2',
    totalData: { label: '总余额(元)', content: '22334' },
    accountsData: [
      { label: '可用余额(元)', content: '214442' },
      { label: '冻结中金额(元)', content: '214442' }
    ]
  }
]

// 渲染金额
const renderAmount = (row) => {
  if (row.turnoverType === '1' || row.turnoverType === '4') {
    return toAmountStr(row.amount, 2, true)
  } else {
    return toAmountStr(row.amount, 2, true)
  }
}

export const columns = [
  { label: '业务时间', key: 'createdTime', minWidth: 140 },
  { label: '业务类型', key: 'turnoverType1', minWidth: 100, render: (row) => accountBusinessType[row.turnoverType] },
  { label: '单据类型', key: 'turnoverType2', minWidth: 100, render: (row) => accountInvoiceType[row.turnoverType] }, // 1 入账 2出账 3付款 4退款
  { label: '单据编号', key: 'turnoverSn', minWidth: 100 },
  { label: '金额（元)', key: 'amount', minWidth: 100, align: 'right', render: renderAmount },
  { label: '操作', key: 'operate', minWidth: 150 },
]

export const formData = {
  daterange: undefined,
  businessType: undefined,
  orderCode: undefined,
}

export const formConfig = [
  { type: 'datePicker', kind: 'daterange', key: 'daterange', label: '业务时间段' },
  { type: 'select', key: 'businessType', label: '业务类型' },
  { type: 'input', key: 'orderCode', label: '单据编号' },
]
