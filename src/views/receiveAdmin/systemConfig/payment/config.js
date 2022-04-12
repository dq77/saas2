export const title = '支付方式配置'
export const formData = { dictName: '' }
export const formConfig = [
  { type: 'input', key: 'dictName', label: '支付方式名称', maxlength: 50 },
]
export const formRules = {
  dictName: [
    { required: true, message: '请输入支付方式名称', trigger: 'blur' },
  ]
}
