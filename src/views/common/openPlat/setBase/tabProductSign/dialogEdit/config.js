export const formConfig = [
  { type: 'input', key: 'labelName', label: '标签名称' },
  { type: 'input', key: 'labelExtCode', label: '标签编号' },
  {
    type: 'select',
    key: 'accountTypeCode',
    label: '优先扣款账户',
    options: [],
    otherKeys: { label: 'accountTypeName', value: 'accountTypeCode' }
  }
]

export const formRules = {
  labelName: [
    { required: true, message: '请输入标签名称', trigger: ['blur'] },
  ],
  labelExtCode: [
    { required: true, message: '请输入标签编号', trigger: ['blur'] },
  ]
}

export const formData = {
  labelName: null,
  labelExtCode: null,
  accountTypeCode: null,
}
