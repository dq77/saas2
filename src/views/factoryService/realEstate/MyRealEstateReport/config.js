import { applyStatusMap } from '@/utils/enums'
import { toDateStr } from '@/utils/util'

export const applyListColumns = [
  { label: '申请日期', key: 'applyTime', render: (row, v) => toDateStr(v, 'yyyy-MM-dd'), width: '120'},
  { label: '企业名称', key: 'companyName', minWidth: '150' },
  { label: '申请状态', key: 'applyStatus', render: (row, v) => applyStatusMap[v] || '- -'},
  { label: '完成日期', key: 'finishTime' },
  { label: '操作', key: 'operate', width: 200 },
]
