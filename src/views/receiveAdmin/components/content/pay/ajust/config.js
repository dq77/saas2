export const formData = {
  fundTypeName: undefined,
  fundType: undefined,
  receivableAmount: undefined,
  adjustAmount: undefined,
  adjustType: undefined,
  targetPlanItemId: undefined,
  memo: undefined,
  saArmBusinessFileList: null
}
export const formConfig = [
  { type: 'input', key: 'fundTypeName', label: '款项类型', disabled: true },
  { type: 'input', key: 'receivableAmount', label: '计划应收金额', disabled: true, inputAppend: 'moneyAppend' },
  { type: 'inputNumber', key: 'adjustAmount', label: '调整金额', min: 0.01, max: 0, precision: 2, nocontrols: true, unit: '元' },
  { type: 'radio', key: 'adjustType', label: '计划调整方式', options: [{ label: '滚动至指定款项', value: 1 }, { label: '滚动至最后款项', value: 2 }] },
  { type: 'select', key: 'targetPlanItemId', label: '滚入目标款项', options: [], otherKeys: { label: 'label', value: 'id' }, disabled: false },
  { type: 'input', kind: 'textarea', key: 'memo', label: '调整备注' },
  { type: null, key: 'saArmBusinessFileList', label: '附件', slotName: 'saArmBusinessFileList' },
]
export const formRules = {
  adjustAmount: [{ required: true, message: '请输入调整金额', trigger: 'blur' }],
  adjustType: [{ required: true, message: '请选择计划调整方式', trigger: ['blur', 'change'] }],
  targetPlanItemId: [{ required: true, message: '请选择滚入目标款项', trigger: 'blur' }]
}
