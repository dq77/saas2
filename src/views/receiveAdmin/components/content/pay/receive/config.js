// 收款来源
export const sourceOptions = {
  1: '客户主动还款',
  2: '催收回款'
}

export const formData = {
  fundType: undefined,
  fundTypeName: undefined,
  receivableAmount: undefined,
  repaymentType: undefined,
  jhTime: undefined,
  jhMoney: undefined,
  payUser: undefined,
  payKind: undefined,
  textarea: undefined,
  decs: undefined,
  saArmBusinessFileList: null
}
export const formConfig = [
  { type: 'input', key: 'fundTypeName', label: '款项类型', disabled: true },
  { type: 'inputNumber', key: 'receivableAmount', label: '计划应收金额', disabled: true, unit: '元', precision: 2, nocontrols: true },
  { type: 'select', key: 'repaymentType', label: '收款来源', options: Object.keys(sourceOptions).map(key => ({ label: sourceOptions[key], value: key })) },
  { type: 'datePicker', key: 'repaymentTime', label: '收款时间' },
  { type: 'inputNumber', key: 'repaymentAmount', label: '收款金额', precision: 2, width: '150px', min: 0.01, max: 0, nocontrols: true, slotName: 'jhMoney', unit: '元', unitLeft: 109 },
  { type: 'input', key: 'payerName', label: '付款方', maxlength: 50 },
  { type: 'select', key: 'paymentType', label: '付款方式', otherKeys: { label: 'dictName', value: 'dictCode' }, options: [], slotName: 'paymentType' },
  { type: 'input', kind: 'textarea', key: 'memo', label: '收款备注', maxlength: 500 },
  { type: null, key: 'saArmBusinessFileList', label: '附件', slotName: 'saArmBusinessFileList' },
]
export const formRules = {
  repaymentTime: [{ required: true, message: '请选择收款时间', trigger: 'blur' }],
  repaymentAmount: [{ required: true, message: '请输入收款金额', trigger: 'blur' }],
  repaymentType: [{ required: true, message: '请选择收款来源', trigger: 'blur' }]
}
