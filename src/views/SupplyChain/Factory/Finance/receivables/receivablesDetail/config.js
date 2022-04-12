import { renderBusinessType, renderInvoiceType, renderShouldInCome, renderActualInCome } from './util'

export const columns = [
  { label: '业务时间', key: 'createdTime', minWidth: 140 },
  { label: '业务类型', key: 'accountType', minWidth: 100, render: renderBusinessType },
  { label: '单据类型', key: 'accountCode', minWidth: 100, render: renderInvoiceType },
  { label: '单据编号', key: 'invoiceSn', minWidth: 100 },
  { label: '应收金额(元)', key: 'incomeAmount1', minWidth: 100, align: 'right', render: renderShouldInCome },
  { label: '收款金额(元)', key: 'incomeAmount2', minWidth: 100, align: 'right', render: renderActualInCome },
  { label: '操作', key: 'operate', fixed: 'right', minWidth: 150 },
]

export const formData = {
  businessType: undefined,
}

export const formConfig = [
  { type: 'select', key: 'businessType', label: '业务类型' },
]
