import { percent2 } from '@/utils/qjd'
import { sourceOptions } from '../receive/config'

export const columns = [
  { label: '收款时间', key: 'repaymentTime' },
  { label: '收款金额', key: 'repaymentAmount', render: (row, item) => item ? percent2(item) : '- -' },
  { label: '收款来源', key: 'repaymentType', render: (row, item) => item && sourceOptions[item] ? sourceOptions[item] : '- -' },
  { label: '付款方', key: 'payerName' },
  { label: '付款方式', key: 'paymentTypeName' },
  { label: '收款备注', key: 'memo' },
  { label: '附件', key: 'files' },
]
