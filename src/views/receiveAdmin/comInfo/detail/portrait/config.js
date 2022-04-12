export const receiveColumns = [
  { label: '应收计划数（笔）', key: 'receivablePlanCount', integer: true },
  { label: '应收款项数（笔）', key: 'receivablePlanItemCount', integer: true },
  { label: '应收总金额（元）', key: 'receivableAmount' },
  { label: '已收总金额（元）', key: 'returnedAmount' }
]

export const overColunms = [
  { label: '当前逾期款项数（笔）', key: 'todayOverdueCount', integer: true },
  { label: '当前逾期金额（元）', key: 'todayOverdueAmount' },
  { label: '当前最高逾期天数（天）', key: 'todayOverdueMaxDays', integer: true }
]
