export const levelEnu = {
  1: '一级类目',
  2: '二级类目',
  3: '三级类目',
  4: '四级类目',
  5: '五级类目'
}
export const mFormData = {
  name: '',
  parentId: '',
}
export const mFormConfig = [
  { type: 'text', key: 'parentName', label: '上级分类'},
  { type: 'input', key: 'parentId', label: '上级分类id', disable: true, isHidden: true },
  { type: 'input', key: 'name', label: '分类名称' },
]
export const mFormRules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: ['change', 'blur'] },
  ]
}
