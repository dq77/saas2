export const pFormData = {
  parentName: undefined,
  name: undefined
}
export const pFormConfig = [
  { type: 'text', key: 'parentName', label: '上级类目：' },
  { type: 'input', key: 'name', label: '分类名称：' },
]

export const pFormRules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: ['blur', 'change'] }
  ],
}
