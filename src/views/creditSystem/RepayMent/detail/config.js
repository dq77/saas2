import { percent2, getDate } from '@/utils/qjd'
import { repayStatus } from '@/utils/enums'

const getTypes = (pagedRecords) => {
  let str = ''
  pagedRecords && pagedRecords.map((item, index) => {
    str += `${item.creditTypeName}（${item.operationName}金额：${item.amount}）${index < pagedRecords.length - 1 ? '，' : ''}`
  })
  return str || '- -'
}

export const defaultActiveName = ['user', 'order', 'good', 'pay']

export const colColumns = [
  { label: '用信信息', key: 'user' },
  { label: '订单信息', key: 'order' },
  { label: '货单信息', key: 'good' },
  { label: '还款信息', key: 'pay' }
]

export const userColumns = [
  { label: '授信类型：', key: 'pagedRecords', render: (dataSource, pagedRecords) => getTypes(pagedRecords) }
]

export const orderColumns = [
  { label: '订单编号：', key: 'extOrderCode' },
  { label: '客户名称：', key: 'customerName' },
  { label: '项目编号：', key: 'extProjectCode' },
  { label: '用信金额：', key: 'creditAmount', render: (dataSource, item) => percent2(item) },
  { label: '项目名称：', key: 'projectName', num: 1 }
]

export const goodColumns = [
  { label: '发货单号：', key: 'extDeliveryCode' },
  { label: '发货时间：', key: 'deliveryTime' },
  { label: '最终还款时间：', key: 'debtEndTime', render: (dataSource, item) => item ? getDate(item) : '- -' },
  { label: '剩余欠款金额：', key: 'leftLoanAmount', render: (dataSource, item) => percent2(item) },
  { label: '还款状态：', key: 'repayStatus', render: (dataSource, item) => item ? repayStatus[item] : '- -' },
  { label: '还款周期：', key: 'debtPeriodDays', render: (dataSource, item) => item ? `${item}天` : '- -' }
]

export const payColumns = [
  { label: '还款编号', key: 'loanNo' },
  { label: '总赊销金额', key: 'loanAmount', render: (dataSource, item) => percent2(item) },
  { label: '剩余待还金额', key: 'leftLoanAmount', render: (dataSource, item) => percent2(item) }
]
