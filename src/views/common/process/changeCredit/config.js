import { getDate } from '@/utils/qjd'
import { toDateStr } from '@/utils/util'

export const columns = [
  { label: '客户名称：', key: 'customerName' },
  { label: '授信类型：', key: 'creditTypeName' },
  { label: '申请时间：', key: 'CREATE_TIME', render: (data, item) => toDateStr(item, 'yyyy-MM-dd hh:mm:ss') },
  { label: '当前失效时间：', key: 'oldValidTo', render: (data, item) => item ? getDate(item) : '- -' },
  { label: '变更失效时间：', key: 'newValidTo', render: (data, item) => item ? getDate(item) : '- -' },
  { label: '当前授信额度：', key: 'oldCreditLine' },
  { label: '变更授信额度：', key: 'newCreditLine', num: 1 },
  { label: '备注：', key: 'reason', num: 1 },
]
