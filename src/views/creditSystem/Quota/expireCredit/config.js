export const formData = {
  customerName: undefined,
  creditTypeName: undefined,
  creditStatusName: undefined,
  createdTime: undefined,
  validTo: undefined,
  creditAmount: undefined,
  reason: undefined
}

export const formConfig = [
  { type: 'text', key: 'customerName', label: '客户名称' },
  { type: 'text', key: 'creditTypeName', label: '授信类型' },
  { type: 'text', key: 'creditStatusName', label: '授信状态' },
  { type: 'text', key: 'createdTime', label: '申请时间' },
  { type: 'text', key: 'validTo', label: '失效时间' },
  { type: 'text', key: 'creditAmount', label: '授信额度' },
  { type: 'input', kind: 'textarea', key: 'reason', label: '备注' }
]
