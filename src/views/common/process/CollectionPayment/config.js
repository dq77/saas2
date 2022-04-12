import { toDateStr } from '@/utils/util'

export const defaultActiveName = ['process']

export const colColumns = [
  { label: '流程信息', key: 'process' },
]

export const processColumns = [
  { label: '客户名称：', key: 'customerName' },
  { label: '银行流水：', key: 'bankSerialNo' },
  { label: '回款日期：', key: 'returnDate', render: (dataSource, item) => item ? toDateStr(item, 'yyyy-MM-dd') : '- -' },
  { label: '剩余应收(总)金额：', key: 'remainReceivableAmount' },
  { label: '逾期(总)金额：', key: 'overdueAmount' },
  { label: '本次回款金额：', key: 'returnAmount' },
]
