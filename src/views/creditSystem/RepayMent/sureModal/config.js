import { percent2 } from '@/utils/qjd'

export const columns = [
  { label: '客户名称', key: 'customerName' },
  { label: '发货单号', key: 'extDeliveryCode' },
  { label: '剩余欠款金额', key: 'loanAmount', align: 'right', render: (row, item) => percent2(item) },
  { label: '退款金额', key: 'backAmount', align: 'right', render: (row, item) => percent2(item) },
]
