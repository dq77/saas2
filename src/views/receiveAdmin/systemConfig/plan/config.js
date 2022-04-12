export const columns = [
  { label: '应收策略名称', key: 'receivableSolutionName' },
  { label: '收款周期（天）', key: 'receivableCycle'},
  { label: '应收金额占应收总额比例（%）', key: 'receivableProportion' },
  { label: '操作', key: 'operate', width: 200 },
]
export const formData = { receivableSolutionName: '', receivableCycle: 0, receivableProportion: 0, customType: 'edit' }
