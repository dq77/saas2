import { toAmountStr } from '@/utils/util'

export const LoanFormData = {
  companyName: undefined,
  orderCode: undefined,
  loanNo: undefined,
  transTime: undefined,
  transStartTime: undefined,
  transEndTime: undefined,
}

export const getLoanConfig = (remoteMethod) => {
  return [
    {
      type: 'select',
      key: 'companyName',
      label: '公司名称',
      filterable: true,
      remote: true,
      otherKeys: { label: 'corpName', value: 'corpName' },
      remoteMethod,
      options: [],
      clearable: true
    },
    { type: 'input', key: 'loanNo', label: '支付货款编号', clearable: true },
    {
      type: 'datePicker',
      key: 'transTime',
      clearable: true,
      kind: 'daterange',
      label: '支付时间',
      span: 12
    },
    { type: 'input', key: 'orderCode', label: '订单编号', clearable: true },
  ]
}

export const loanColumns = [
  { label: '支付时间', key: 'transTime', width: 150 },
  { label: '订单编号', key: 'orderCode' },
  { label: '支付货款编号', key: 'loanNo' },
  { label: '项目（订单）名称', key: 'projectName', },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家', key: 'supplierName' },
  { label: '产品', key: 'productName' },
  { label: '订单金额', key: 'orderAmount', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '支付货款金额', key: 'paymentAmount', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '退款非实收抵扣金额', key: 'refundDeductedAmount', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '操作', key: 'operate' }
]
