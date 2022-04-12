import { toAmountStr, toDateStr } from '@/utils/util'
const renderAmount = (row, item) => item || item === 0 ? toAmountStr(item, 2, true) : '- -'
const renderDate = (row, item) => item ? toDateStr(item, 'yyyy-MM-dd') : '- -'
/** 折叠配置 */
export const collapseColumns = [
  { key: 'base', label: '流水概要' },
  { key: 'detail', label: '流水明细' }
]
export const activeCollapse = ['base', 'detail']
/** 基础信息 */
export const baseConfig = [
  { label: '账号名称', key: 'accountName' },
  { label: '账号', key: 'account' },
  { label: '流水文件', key: 'fileName', type: 'file' },
  { label: '查询日期', key: 'queryDate' },
  { label: '打印机构', key: 'printMechanism' },
  { label: '币种类型', key: 'currencyType' },
  { label: '交易时段', key: 'tradeSession' }
]
/** 流水明细 */
export const detailColumn = [
  { label: '流水号', key: 'tradeSerialNum' },
  { label: '发生日期', key: 'keepAccountDate', render: renderDate },
  { label: '交易金额（收入）', key: 'incomeAmount', render: renderAmount },
  { label: '交易金额（支出）', key: 'expenditureAmount', render: renderAmount },
  { label: '余额', key: 'balance', render: renderAmount },
  { label: '交易对方', key: 'counterparty' },
  { label: '备注/摘要', key: 'summary' },
]
export const detailConfig = [
  { title: '', columns: detailColumn, dataSource: [], key: 'commonBankFlowDetails' }
]
