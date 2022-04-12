import { percent2 } from '@/utils/qjd'

export const defaultActiveName = ['info', 'refundDetail']

export const colColumns1 = [
  { label: '订单基础信息', key: 'info' },
  { label: '退款抵扣详情', key: 'refundDetail' },
]

export const colColumns2 = [
  { label: '订单基础信息', key: 'info' },
  { label: '订单抵扣详情', key: 'refundDetail' },
]
export const columns1 = [
  { label: '抵扣时间', key: 'transTime' },
  { label: '订单编号', key: 'orderCode' },
  { label: '厂家退货单号', key: 'returnOrderNo' },
  { label: '退款编号', key: 'refundId' },
  { label: '支付货款编号', key: 'refundLoanNo' },
  { label: '项目（订单）名称', key: 'projectName' },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家', key: 'supplierName' },
  { label: '非实收退款金额', key: 'totalRefundAmount', minWidth: 150, render: (data, item) => percent2(item) },
  { label: '抵扣退款非实收金额', key: 'deductedAmount', minWidth: 150, render: (data, item) => percent2(item) },
]

// 详情
export const detailColumns1 = [
  { label: '订单创建日期', key: 'orderCreatedTime' },
  { label: '订单编号', key: 'orderCode' },
  { label: '支付货款编号', key: 'loanNo' },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家名称', key: 'supplierName' },
  { label: '项目（订单）名称', key: 'projectName' },
  { label: '产品', key: 'productName' },
  { label: '订单金额', key: 'orderAmount', render: (data, item) => percent2(item) },
  { label: '支付货款金额', key: 'paymentAmount', render: (data, item) => percent2(item) },
  { label: '非实收抵扣金额', key: 'deductedAmount', render: (data, item) => percent2(item) },
]

// 退款详情详情
export const columns2 = [
  { label: '抵扣时间', key: 'transTime' },
  { label: '订单编号', key: 'orderCode' },
  { label: '支付货款编号', key: 'loanNo' },
  { label: '项目（订单）名称', key: 'projectName' },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家名称', key: 'supplierName' },
  { label: '订单金额', key: 'orderAmount', render: (data, item) => percent2(item) },
  { label: '支付货款金额', key: 'paymentAmount', render: (data, item) => percent2(item) },
  { label: '非实收退款抵扣金额', key: 'deductedAmount', render: (data, item) => percent2(item) },
  { label: '退款非实收余额', key: 'refundBalance', render: (data, item) => percent2(item) },
]

export const detailColumns2 = [
  { label: '订单创建日期', key: 'orderCreatedTime' },
  { label: '订单编号', key: 'orderCode' },
  { label: '厂家退货单号', key: 'returnOrderNo' },
  { label: '退款编号', key: 'refundId' },
  { label: '支付货款编号', key: 'loanNo' },
  { label: '公司名称', key: 'companyName' },
  { label: '合作厂家', key: 'supplierName' },
  { label: '已抵扣退款非实收金额', key: 'deductedAmount', minWidth: 150, render: (data, item) => percent2(item) },
  { label: '退款非实余额', key: 'refundBalance', minWidth: 150, render: (data, item) => percent2(item) },
  { label: '退款金额', key: 'refundAmount', minWidth: 150, render: (data, item) => percent2(item) },
]
