const vTotal = (rule, value, callback) => {
  if (value <= 0) {
    callback(new Error('必须大于0天'))
  } else if (!/^\d+$/.test(value)) {
    callback(new Error('请输入整数天数'))
  } else {
    callback()
  }
}
const descVd = (rule, value, callback) => {
  if (value.length < 10) {
    callback(new Error('修改说明不少于10个字符'))
  } else {
    callback()
  }
}

export const pFormData = {
  debtPeriodDays: undefined,
  desc: undefined
}

export const pFormConfig = [
  { type: 'input', key: 'debtPeriodDays', label: '还款周期' },
  { type: 'input', key: 'desc', kind: 'textarea', label: '修改说明' }
]

export const pFormRules = {
  debtPeriodDays: [
    { required: true, message: '请输入还款周期', trigger: ['change', 'blur'] },
    { validator: vTotal, trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请输入修改说明', trigger: ['change', 'blur'] },
    { validator: descVd, trigger: 'blur' },
  ]
}
