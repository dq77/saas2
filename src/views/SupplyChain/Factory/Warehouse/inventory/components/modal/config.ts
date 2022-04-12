export const formData: Object = {
  warehouseId: null,
}

export const formConfig = [
  { type: 'select', key: 'warehouseId', label: '选择仓库', options: [], otherKeys: { label: 'name', value: 'id' }, info: null },
]

export const formRules = {
  warehouseId: [
    { required: true, message: '请选择仓库', trigger: ['blur', 'change'] },
  ]
}
