import { toDateStr } from '@/utils/util'

// detail => form & table
export const cFormData = {
  companyName: undefined,
}
export const cFormConfig = [
  {
    type: 'input',
    key: 'companyName',
    label: '企业名称',
    clearable: true
  }
]

export const cListColumns = [
  { label: '申请日期', key: 'applyTime', render: (row, v) => toDateStr(v, 'yyyy-MM-dd')},
  { label: '企业名称', key: 'companyName', minWidth: '150' },
  { label: '状态', key: 'applyStatus' },
  { label: '完成日期', key: 'updDatetime', render: (row, v) => row.applyStatus === '已完成' && v ? toDateStr(v, 'yyyy-MM-dd') : '-'},
  { label: '操作', key: 'operate', width: 200 },
]
