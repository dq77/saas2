export const formConfig = [
  { type: 'input', key: 'accountTypeName', label: '账户类型名称' },
  { type: 'input', key: 'accountTypeExtCode', label: '账户类型编号' },
  { type: 'radio', key: 'useRule', label: '余额不足时下单（默认配置）', options: [] }
]

export const formRules = {
  accountTypeName: [
    { required: true, message: '请输入账户类型名称', trigger: ['blur'] },
  ],
  accountTypeExtCode: [
    { required: true, message: '请输入账户类型编号', trigger: ['blur'] },
  ]
}

export const formData = {
  accountTypeName: '',
  accountTypeExtCode: '',
  useRule: '',
}

export const getUseRuleOptions = (accountType) => {
  // 内置账户与自定义账户的单选项不同
  return accountType === '0'
    ? [
      { label: '允许下单', value: '1' },
      { label: '不允许下单', value: '2' }
    ]
    : [
      { label: '使用基本账户付款', value: '3' },
      { label: '不允许下单', value: '2' }
    ]
}
