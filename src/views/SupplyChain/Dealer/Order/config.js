import { toAmountStr, getOptionsByObj } from '@/utils/util'
import { saasOrderStatus } from '@/utils/enumsSaas'

export const columns = [
  { label: '订单号', key: 'orderSn', width: 140 },
  { label: '项目', key: 'projectName', minWidth: 100 },
  { label: '订单总金额', key: 'payAmount', minWidth: 80, sortable: 'custom', align: 'right', render: (row, item) => row.payAmount ? `¥${toAmountStr(row.payAmount, 2, true)}` : '- -' },
  { label: '订单状态', key: 'status', width: 100, render: (row, item) => saasOrderStatus[row.status] },
  // { label: '下单方式', key: 'status', width: 100, render: (row, item) => placeOrderType[row.sourceType] },
  { label: '创建时间', key: 'createdTime', width: 140, sortable: 'custom' },
  { label: '创建人', key: 'createdByName', width: 120 },
  { label: '操作', key: 'operate' },
]

export const cFormData = {
  timeList: undefined,
  orderSn: undefined,
  projectName: undefined,
  status: undefined
}

export const cFormConfig = [
  { type: 'datePicker', key: 'timeList', label: '创建时间', kind: 'daterange' },
  { type: 'input', key: 'orderSn', label: '订单号' },
  { type: 'input', key: 'projectName', label: '项目名称' },
  { type: 'select', key: 'status', label: '订单状态', options: getOptionsByObj(saasOrderStatus) },
]
