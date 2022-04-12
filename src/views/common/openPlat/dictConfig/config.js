export const defaultTab = 'b000'
export const searchTabs = [
  { label: '档案字典', value: 'dic' },
]
export const cFormData = {
  dictName: undefined,
}

export const cFormConfig = [
  { type: 'input', key: 'dictName', label: '字典名称' },
]
export const columns = [
  { label: '排序', key: 'dictSort', width: 140 },
  { label: '编号', key: 'dictExtCode', minWidth: 100 },
  { label: '名称', key: 'dictName', minWidth: 100 },
  { label: '类型', key: 'dictType', minWidth: 120, align: 'center', render: (row, item) => row.dictType === 1 ? '系统内置' : '自定义'},
  { label: '状态', key: 'remainingAmount', minWidth: 120, align: 'center', render: (row, item) => row.dictStatus === '1' ? '正常' : '停用' },
  { label: '操作', key: 'operate' },
]
export const mFormData = {
  dictName: '',
  dictExtCode: '',
  dictSort: ''
}
export const mFormConfig = [
  { type: 'input', key: 'dictName', label: '名称' },
  { type: 'input', key: 'dictExtCode', label: '编号' },
  { type: 'input', key: 'dictSort', label: '排序' },
]
export const mFormRules = {
  dictName: [
    { required: true, message: '请输入字典名称', trigger: ['change', 'blur'] },
  ],
  dictExtCode: [
    { required: true, message: '请输入字典编号', trigger: ['change', 'blur'] },
  ]
}
