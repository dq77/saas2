// 需要提醒的每月日期
export const expendDaysConfig = [29, 30, 31]

const daysOptions = Array.from({ length: 31 }, (v, k) => ({ value: k + 1, label: k + 1 + '号' }))

export const formConfig = [
  { type: 'input', key: 'customerName', label: '客户名称', disabled: true },
  {
    slotName: 'cycle',
    key: 'cycle',
    label: '对账周期',
    required: true,
    typeOptions: [
      { label: '月度', value: 'month' }
    ],
    daysOptions
  }
]

export const formRules = {
  customerName: [
    { required: true, message: '请选择客户', trigger: ['blur'] },
  ],
  cycle: [
    { required: true, message: '请选择每月对账日期', trigger: ['blur'] },
  ]
}

export const formData = {
  customerName: '',
  cycleType: 'month', // 月度
  cycle: null, // 每月29日
}
