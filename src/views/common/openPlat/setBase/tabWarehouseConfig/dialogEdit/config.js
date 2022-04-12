export const formConfig = [
  { type: 'input', key: 'name', label: '仓库名称' },
  { type: 'input', key: 'code', label: '仓库编号' },
  { type: 'cascader', key: 'address', label: '仓库地址', options: [], props: { value: 'code', label: 'name' } },
  { type: 'input', key: 'detailAddress', label: '仓库详细地址' },
]

export const formRules = {
  name: [
    { required: true, message: '请输入仓库名称', trigger: ['blur'] },
  ],
  code: [
    { required: true, message: '请输入仓库编号', trigger: ['blur'] },
  ]
}

export const formData = {
  name: null,
  code: null,
  address: null,
  detailAddress: null,
}
