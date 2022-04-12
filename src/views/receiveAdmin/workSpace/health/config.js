export const columns = [
  { title: '当前逾期企业数（家）', key: 'overdueCustomersNum', transform: false, tooltip: '实时数，当前正在逾期的收款对象数量（仅包含企业）' },
  { title: '当前逾期款项数（笔）', key: 'overdueItemNum', transform: false, tooltip: '实时数，当前正在逾期的款项笔数' },
  { title: '当前逾期金额总和（元）', key: 'overdueAmountTotal', transform: true, tooltip: '实时数，当前正在逾期的以款项为维度的逾期金额总和' },
  { title: '当前最高逾期天数（天）', key: 'overdueMaxDays', transform: false, tooltip: '实时数，当前正在逾期的，逾期天数的最大值' }
]
