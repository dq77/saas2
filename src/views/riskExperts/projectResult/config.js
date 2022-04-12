import { toDateStr } from '@/utils/util'

export const columns = [
  { label: '股东及出资信息', key: 'name', width: '250'},
  { label: '持股比例', key: 'percent', minWidth: '150' },
  { label: '认缴出资额', key: 'amomon', },
  { label: '公示时间', key: 'time', render: (row, v) => toDateStr(v, 'yyyy-MM-dd'), },
]
