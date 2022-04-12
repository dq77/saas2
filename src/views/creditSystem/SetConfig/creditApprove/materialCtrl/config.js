export const columns = [
  { label: '材料名称', key: 'materialsName' },
  { label: '应用场景', key: 'applicationScenario'},
  { label: '是否必传', key: 'mustPass' },
  { label: '操作', key: 'operate', width: 200 },
]

export const dataSample = { mustPass: '', applicationScenario: [], materialsName: '', customType: 'edit', loading: false }

export const options = [
  { label: '是', value: '1' },
  { label: '否', value: '0' }
]
