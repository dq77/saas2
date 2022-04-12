export const formConfig = [
  {
    type: 'radio',
    key: 'type',
    label: '退货方式',
    options: [
      // { label: '原路退回', value: 1 },
      // { label: '退至指定仓库', value: 2 },
    ],
  },
  { type: 'select', key: 'warehouseId', label: '仓库', options: [], otherKeys: { label: 'name', value: 'id' }, span: 6, clearable: true, isHidden: true },
]

export const formRules = {
  type: [
    { required: true, message: '请选择退货方式' },
  ],
  warehouseId: [
    { required: true, message: '请选择退货仓库' },
  ]
}

export const formData = {
  type: undefined,
  warehouseId: undefined,
}
