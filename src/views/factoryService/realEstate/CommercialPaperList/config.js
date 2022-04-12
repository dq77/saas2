import { toAmountStr } from '@/utils/util'
const toAmount = (v) => {
  const str = toAmountStr(v, 2, true)
  if (str) return Number(str)
  return '--'
}
const toAmountStr2 = (v) => {
  if (v) return Number(v).toFixed(2)
  return '--'
}
export const ticketColumns = [
  { label: '承兑人', key: 'companyName', minWidth: '240px', fixed: 'left' },
  { label: '承兑总笔数', key: 'accepted', minWidth: '120px' },
  { label: '承兑总金额（万元）', key: 'acceptedAmount', minWidth: '140px', render: (row, v) => toAmountStr(v, 2, true) || '--' },
  { label: '已结清总笔数', key: 'cleared', minWidth: '120px' },
  { label: '已结清总金额（万元）', key: 'clearedAmount', minWidth: '140px', render: (row, v) => toAmountStr(v, 2, true) || '--' },
  { label: '未结清总笔数', key: 'uncleared', minWidth: '120px' },
  { label: '未结清总金额（万元）', key: 'unclearedAmount', minWidth: '140px', render: (row, v) => toAmountStr(v, 2, true) || '--' },
  { label: '拒付总笔数', key: 'refusePayment', sortable: 'custom', minWidth: '120px' },
  { label: '拒付总金额（万元）', key: 'refusePaymentAmount', sortable: 'custom', minWidth: '180px', render: (row, v) => toAmountStr(v) || '--' },
  { label: '拒付率', key: 'refusePaymentRatio', minWidth: '120px', sortable: 'custom', render: (row, value) => { return `${(parseFloat(value) * 100).toFixed(0)}%` } },
  { label: '周贴现率', key: 'weekdealAveragerate', minWidth: '170px', sortable: 'custom', render: (row, value) => { return value ? `${(parseFloat(value)).toFixed(2)}%` : '-' } },
  { label: '查询时间', key: 'publishTime', minWidth: '120px' },
]

export const issuedColumns = [
  { label: '债券代码', key: 'code', minWidth: '120px', fixed: 'left' },
  { label: '债券简称', key: 'abbreviation', minWidth: '200px', fixed: 'left' },
  { label: '发行人', key: 'issuer', minWidth: '200px', fixed: 'left' },
  { label: '债券期限（年）', key: 'term', minWidth: '120px', render: (row, v) => toAmount(v) },
  { label: '票面利率%', key: 'couponRate', minWidth: '120px', render: (row, v) => toAmountStr2(v) },
  { label: '发行规模（亿元）', key: 'issuanceScale', minWidth: '140px' },
  { label: '发行起始日期', key: 'issuanceStartDate', minWidth: '120px' },
  { label: '发行截止日期', key: 'issuanceDeadline', minWidth: '120px' },
  { label: '债项评级', key: 'debtRating', minWidth: '120px' },
  { label: '市场', key: 'market', minWidth: '120px' },
  { label: '债券类型', key: 'type', minWidth: '120px' },
  { label: '所属地区', key: 'province', minWidth: '120px' },
]
export const breachColumns = [
  { label: '债券代码', key: 'code', minWidth: '120px', fixed: 'left' },
  { label: '债券简称', key: 'abbreviation', minWidth: '200px', fixed: 'left' },
  { label: '发债人', key: 'issuer', minWidth: '200px', fixed: 'left' },
  { label: '累计违约金额（亿）', key: 'cumulativeDefaultAmount', minWidth: '140px' },
  { label: '最新违约金额（亿）', key: 'latestDefaultAmount', minWidth: '140px' },
  { label: '最新违约日', key: 'latestDefaultDate', minWidth: '120px' },
  { label: '首次违约日', key: 'firstDefaultDate', minWidth: '120px' },
  { label: '违约原因', key: 'latestDefaultReason', minWidth: '120px' },
  { label: '违约现金流类型', key: 'latestDefaultCashFlowType', minWidth: '140px' },
  { label: '上市市场', key: 'market', minWidth: '120px' },
  { label: '债券类型', key: 'type', minWidth: '120px' },
  { label: '所属地区', key: 'province', minWidth: '120px' },
  // { label: '是否担保', key: 'isGuarantee', minWidth: '120px' },
  // { label: '是否城投', key: 'isCityInvestmentBond', minWidth: '120px' },
]
