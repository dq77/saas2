
export const formData: Object = {
  businessInDatetime: null,
}

export const formConfig = [
  { type: 'datePicker', key: 'businessInDatetime', label: '调入时间', kind: 'datetime', valueFormat: 'yyyy-MM-dd HH:mm', format: 'yyyy-MM-dd HH:mm', pickerOptions: {} },
]

export const formRules = {
  businessInDatetime: [
    { required: true, message: '请选择调出时间', trigger: 'blur' },
  ]
}
