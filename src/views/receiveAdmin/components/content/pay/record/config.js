import { getDate, percent2 } from '@/utils/qjd'

export const columns = [
  { label: '调整时间', key: 'createdTime', render: (row, item) => item ? getDate(item) : '- -' },
  { label: '调整金额', key: 'adjustAmount', render: (row, item) => item || item === 0 ? percent2(item) : '- -' },
  { label: '调整方式', key: 'adjustType', render: (row, item) => item === 1 ? '滚动至指定项' : item === 2 ? '滚动至最后项' : item === 3 ? '从其他款项滚入' : '- -' },
  { label: '滚出目标款项', key: 'sourcePlanItemName', width: 150 },
  { label: '滚入目标款项', key: 'targetPlanItemName', width: 150 },
  { label: '调整备注', key: 'memo' },
  { label: '附件', key: 'files' },
]
