export const formData: object = {
  name: undefined,
  activityTime: undefined,
  isPurchaseRestricted: 'N',
  restrictedQuantity: undefined,
  overRestrictedStrategy: undefined,
  isAllCustomerQualified: 'Y',
  qualifiedCustomerIdList: []
}

export const formConfig = [
  { type: 'input', key: 'name', slotName: 'name', label: '活动名称', maxlength: 30 },
  {
    type: 'datePicker',
    kind: 'datetimerange',
    key: 'activityTime',
    label: '活动时间',
    valueFormat: 'yyyy-MM-dd HH:mm',
    format: 'yyyy-MM-dd HH:mm',
    rangeSeparator: '至',
    pickerOptions:
      {
        disabledDate(time) { return time.getTime() <= Date.now() - 86400000 },
      }
  },
  { slotName: 'isPurchaseRestricted', type: 'radio', key: 'isPurchaseRestricted', label: '单品限购', options: [{value: 'N', label: '不限购'}, {value: 'Y', label: '限购'}] },
  { slotName: 'isAllCustomerQualified', type: 'radio', key: 'isAllCustomerQualified', label: '活动客户', options: [{value: 'Y', label: '全部客户'}, {value: 'N', label: '部分客户'}] },
]
// 选择时间不能小于等于当前时间
const validateTime = (value): boolean => {
  const time = new Date(value[0])
  if (time.getTime() <= Date.now()) return false
  return true
}

const vStartTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请选择活动时间'))
  } else if (value && !validateTime(value)) {
    return callback(new Error('开始时间需大于当前时间'))
  } else {
    return callback()
  }
}
export const formRules: object = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' }
  ],
  activityTime: [
    { required: true, message: '请选择活动时间', trigger: 'blur' },
    { validator: vStartTime, trigger: 'change' },
  ],
  isPurchaseRestricted: [
    { required: true, message: '请选择单品限购', trigger: 'change' }
  ],
  isAllCustomerQualified: [
    { required: true, message: '请选择活动客户', trigger: 'change' }
  ]
}

export const options: Array<object> = [
  { label: '超限购部分原价购买', value: 'OVER_PART_ORIGIN_PRICE' },
  { label: '超限购数量，拒绝购买', value: 'REJECT_PURCHASE' }
]
