import { percent2 } from '@/utils/qjd'
// table
export const columns = [
  { label: '用信编号', key: 'billNo', width: 150 },
  { label: '订单编号', key: 'extOrderCode', minWidth: 120 },
  { label: '订单金额', key: 'orderAmount', minWidth: 100, sortable: 'custom', align: 'right', render: (row, item) => percent2(item) },
  { label: '用信金额', key: 'creditAmount', minWidth: 100, sortable: 'custom', align: 'right', render: (row, item) => percent2(item) },
  { label: '剩余未发货金额', key: 'orderCloseAmount', minWidth: 130, align: 'right', render: (row, item) => percent2(item) },
  { label: '客户名称', key: 'customerName', minWidth: 120 },
  { label: '用信时间', key: 'createdTime', minWidth: 140, sortable: 'custom', },
  { label: '操作', key: 'operate', options: [{ label: '查看' }] }
]
// 查询-form
export const cFormData = {
  customerName: undefined,
  extOrderCode: undefined,
  time: undefined
}
export const cFormConfig = [
  { type: 'input', key: 'customerName', label: '客户名称' },
  { type: 'input', key: 'extOrderCode', label: '订单编号' },
  { type: 'datePicker', key: 'time', label: '用信时间', kind: 'daterange' }
]
