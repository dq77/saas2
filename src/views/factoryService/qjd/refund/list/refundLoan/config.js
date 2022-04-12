import { toAmountStr } from '@/utils/util'

export const refundFormData = {
  companyName: undefined,
  orderCode: undefined,
  refundId: undefined,
  transTime: undefined,
}

export const getRefundConfig = (remoteMethod) => {
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
    { type: 'input', key: 'refundId', label: '退款单号', clearable: true },
    {
      type: 'datePicker',
      key: 'transTime',
      clearable: true,
      kind: 'daterange',
      label: '退款时间',
      span: 12
    },
    { type: 'input', key: 'orderCode', label: '订单编号', clearable: true },
  ]
}

export const refundColumns = [
  { label: '退款日期', key: 'transTime', width: 150 },
  { label: '订单编号', key: 'orderCode' },
  { label: '退款单号', key: 'refundId' },
  { label: '厂家退货单号', key: 'returnOrderNo', },
  { label: '支付货款编号', key: 'loanNo', },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家', key: 'supplierName' },
  { label: '项目（订单）名称', key: 'projectName' },
  { label: '退款金额', key: 'refundAmount', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '已抵扣金额', key: 'deductedRefundAmount', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '剩余抵扣金额', key: 'refundBalance', width: 100, align: 'right', render: (row, item) => isNaN(item) ? '- -' : toAmountStr(item, 2, true) },
  { label: '操作', key: 'operate' }
]
