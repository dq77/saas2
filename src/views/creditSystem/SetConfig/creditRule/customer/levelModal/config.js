export const formData = { dictName: undefined, dictCode: undefined }
export const formConfig = [
  { type: 'input', key: 'dictName', label: '客户标签名称' },
  { type: 'input', key: 'dictCode', label: '编号', min: 0, precision: 2 }
]
export const formRules = {
  dictName: [
    { required: true, message: '请输入客户标签名称', trigger: 'blur' }
  ],
  dictCode: [
    { required: true, message: '请输入编号', trigger: 'blur' },
  ]
}
