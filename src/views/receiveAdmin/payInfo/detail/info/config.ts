import { percent2 } from '@/utils/qjd'

export const columns = [
  { label: '调整时间', key: 'createdTime' },
  { label: '调整金额', key: 'adjustAmount' },
  { label: '调整方式', key: 'adjustType' },
  { label: '滚出目标款项', key: 'sourcePlanItemName' },
  { label: '滚入目标款项', key: 'targetPlanItemName' },
  { label: '调整备注', key: 'memo' },
  { label: '附件', key: 'files' },
]

export const receiveColumns = [
  { label: '收款时间', key: 'repaymentTime' },
  { label: '收款金额', key: 'repaymentAmount', render: (row, item) => item ? percent2(item) : '- -' },
  { label: '付款方', key: 'payerName' },
  { label: '付款方式', key: 'paymentTypeName' },
  { label: '收款备注', key: 'memo' },
  { label: '附件', key: 'files' },
]
