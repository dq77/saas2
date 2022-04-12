import { percent2 } from '@/utils/qjd'
import { receiveTypes } from '@/consts/receive'

export const configs = [
  { label: '应收类型：', key: 'receivableType', render: item => item && receiveTypes[item] ? receiveTypes[item] : '- -' },
  { label: '应收名称：', key: 'receivablePlanName' },
  { label: '收款对象：', key: 'customerName' },
  { label: '收款金额：', key: 'receivableAmount', color: '#3B68F0', render: item => item ? percent2(item) : '- -' },
]
