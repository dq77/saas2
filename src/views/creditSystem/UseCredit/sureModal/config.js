import { percent2 } from '@/utils/qjd'

export const columns = [
  { label: '客户名称', key: 'customerName' },
  { label: '订单编号', key: 'extOrderCode' },
  { label: '用信金额', key: 'creditAmount', align: 'right', render: (row, item) => percent2(item) },
  { label: '剩余未发货金额', key: 'availableOrderCloseAmount', align: 'right', render: (row, item) => percent2(item) },
  { label: '关单金额', key: 'orderCloseAmount', align: 'right', render: (row, item) => percent2(item) },
]
