// 金额、比例校验
const numberHandle = (rule, value, callback, info) => {
  if (value === 0) {
    return callback(new Error(`${info}需要大于零`))
  }
  callback()
}

export const formData = {
  amount: undefined,
  fundType: undefined,
  createType: 1,
  planStartTime: undefined,
  receivableSolutionCode: undefined,
  receivableSolutionName: undefined,
  receivableCycle: undefined,
  planEndDate: undefined,
  receivableCalculationType: 1,
  receivableProportion: undefined,
  receivableAmount: undefined,
  paymentConditions: undefined,
  paymentType: undefined,
  memo: undefined,
  saArmBusinessFileCreateDTO: null
}
export const formConfig = [
  { type: 'input', key: 'amount', label: '应收总金额', disabled: true, inputAppend: 'receivableAmountAppend' },
  { type: 'select', key: 'fundType', label: '款项类型', options: [], otherKeys: { label: 'dictName', value: 'dictCode' }, slotName: 'fundType' },
  { type: 'radio', key: 'createType', label: '应收款添加方式', options: [{ label: '手动添加', value: 1 }, { label: '导入应收方案', value: 2 }] },
  { type: 'datePicker', key: 'planStartTime', label: '应收计算起始时间', isHidden: true },
  { type: 'select', key: 'receivableSolutionCode', label: '应收方案', options: [], otherKeys: { label: 'receivableSolutionName', value: 'id' }, isHidden: true, slotName: 'fundType' },
  { type: 'input', key: 'receivableCycle', label: '收款周期', isHidden: true, disabled: true},
  { type: 'datePicker', key: 'planEndDate', label: '计划应收时间', disabled: false, isHidden: false },
  { type: 'radio', key: 'receivableCalculationType', label: '应收计算方式', options: [{ label: '按金额', value: 1 }, { label: '按比例', value: 2 }], disabled: false },
  { type: 'inputNumber', key: 'receivableProportion', label: '计划应收比例', disabled: true, min: 0, max: 100, precision: 2, width: '150px', nocontrols: true, slotName: 'receivableProportion', unit: '%', unitLeft: 109 },
  { type: 'inputNumber', key: 'receivableAmount', label: '计划应收金额', min: 0, max: 0, precision: 2, disabled: false, width: '150px', nocontrols: true, slotName: 'receivableAmount', unit: '元', unitLeft: 109 },
  { type: 'input', key: 'paymentConditions', label: '收款条件', maxlength: 100 },
  { type: 'select', key: 'paymentType', label: '付款方式', options: [], otherKeys: { label: 'dictName', value: 'dictCode' }, slotName: 'fundType' },
  { type: 'input', kind: 'textarea', key: 'memo', label: '应收备注', maxlength: 500 },
  { type: null, key: 'saArmBusinessFileCreateDTO', label: '附件', slotName: 'saArmBusinessFileCreateDTO' },
]
export const formRules = {
  fundType: [{ required: true, message: '请选择款项类型', trigger: 'blur' }],
  createType: [{ required: true, message: '请选择应收款添加方式', trigger: 'blur' }],
  planEndDate: [{ required: true, message: '请选择计划应收时间', trigger: 'blur' }],
  receivableCalculationType: [{ required: true, message: '请选择应收计算方式', trigger: 'blur' }],
  receivableProportion: [
    { required: true, message: '请输入计划应收比例', trigger: 'blur' },
    { validator: (rule, value, callback) => numberHandle(rule, value, callback, '比例'), trigger: 'blur' }
  ],
  receivableAmount: [
    { required: true, message: '请输入计划应收金额', trigger: 'blur' },
    { validator: (rule, value, callback) => numberHandle(rule, value, callback, '金额'), trigger: 'blur' }
  ]
}
