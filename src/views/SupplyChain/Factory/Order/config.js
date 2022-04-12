import { toAmountStr, getOptionsByObj } from '@/utils/util'
import { saasOrderStatus, placeOrderType } from '@/utils/enumsSaas'

export const columns = [
  { label: '订单号', key: 'orderSn', width: 100 },
  { label: '客户名称', key: 'customerName', minWidth: 120 },
  { label: '项目', key: 'projectName', minWidth: 100 },
  { label: '下单方式', key: 'sourceType', width: 80, render: (row, item) => placeOrderType[row.sourceType] },
  { label: '订单总金额', key: 'payAmount', minWidth: 120, sortable: 'custom', align: 'right', render: (row, item) => row.payAmount ? `¥${toAmountStr(row.payAmount, 2, true)}` : '- -' },
  { label: '订单状态', key: 'status', width: 80, render: (row, item) => saasOrderStatus[row.status] },
  { label: '创建时间', key: 'createdTime', width: 140, sortable: 'custom' },
  { label: '创建人', key: 'createdByName', width: 120 },
  { label: '操作', key: 'operate', minWidth: 250, fixed: 'right' },
]

export const cFormData = {
  timeList: undefined,
  orderSn: undefined,
  customerId: undefined,
  projectName: undefined,
  status: undefined
}

export const getFormConfig = ({
  getCustomerOptions
}) => [
  { type: 'input', key: 'orderSn', label: '订单号' },
  { type: 'select', key: 'status', label: '订单状态', clearable: true, options: getOptionsByObj(saasOrderStatus) },
  {
    // eslint-disable-next-line
    type: 'select', key: 'customerId', label: '客户名称',
    clearable: true,
    filterable: true,
    remote: true,
    remoteMethod: getCustomerOptions,
    options: [],
    otherKeys: {
      label: 'customerName',
      value: 'id'
    }
  },
  { type: 'input', key: 'projectName', label: '项目名称', clearable: true, },
  { type: 'datePicker', key: 'timeList', label: '创建时间', kind: 'daterange', clearable: true, },
]
