export const formData = {
  customerName: undefined,
  creditTypeName: undefined,
  creditStatusName: undefined,
  createdTime: undefined,
  validTo: undefined,
  newValidTo: undefined,
  creditAmount: undefined,
  newCreditLine: undefined,
  reason: undefined
}

export const formRules = {
  newCreditLine: [
    { required: true, message: '请输入变更授信额度', trigger: ['blur', 'change'] }
  ]
}

export const formConfig = [
  { type: 'text', key: 'customerName', label: '客户名称' },
  { type: 'text', key: 'creditTypeName', label: '授信类型' },
  { type: 'text', key: 'creditStatusName', label: '授信状态' },
  { type: 'text', key: 'createdTime', label: '申请时间' },
  { type: 'text', key: 'validTo', label: '当前失效时间' },
  { type: 'datePicker', key: 'newValidTo', label: '变更失效时间' },
  { type: 'text', key: 'creditAmount', label: '当前授信额度' },
  { type: 'inputNumber', key: 'newCreditLine', label: '变更授信额度', min: 0.01, precision: 2 },
  { type: 'input', kind: 'textarea', key: 'reason', label: '备注' }
]
