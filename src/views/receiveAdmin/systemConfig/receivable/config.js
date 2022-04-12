export const title = '应收款项配置'
export const formData = { dictName: '' }
export const formConfig = [
  { type: 'input', key: 'dictName', label: '款项名称', maxlength: 50 },
]
export const formRules = {
  dictName: [
    { required: true, message: '请输入款项名称', trigger: 'blur' },
  ]
}
