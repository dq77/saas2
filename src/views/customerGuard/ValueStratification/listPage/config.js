// form
export const cFormData = {
  corpName: undefined,
  startScore: undefined,
  endScore: undefined
}
export const cFormConfig = [
  {
    type: 'input',
    key: 'corpName',
    label: '企业名称',
    clearable: true
  },
  {
    type: null,
    label: '价值分数',
    key: 'score',
    slotName: 'score',
    span: 6
  }
]
// table
export const tableColumns = [
  { label: '企业名称', key: 'corpName', minWidth: 150 },
  { label: '价值分数', key: 'modelScore', minWidth: 100, slotName: 'modelScore', sortable: 'custom', render: (row, item) => Math.round(item) || '0' },
  { label: '触发红线条数', key: 'redCount', minWidth: 110, sortable: 'custom', render: (row, item) => item || '0' },
  { label: '最近更新时间', key: 'modelResultTime', minWidth: 110, sortable: 'custom', },
  { label: '价值详情', key: 'enterpriseImage', slotName: 'enterpriseImage' },
  { label: '风险管理', key: 'focusOn', slotName: 'focusOn' },
  { label: '操作', key: 'operate', slotName: 'operate', width: 250 }
]
