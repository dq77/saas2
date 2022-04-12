import { vPhone2, vEmail } from '@/utils/validateRules'

// 催收类型
export const urgeTypeEnumOptions = {
  TEL: '电话',
  VISIT: '外访',
  OTHER: '其他'
}
// 新建催收记录-form
export const formData = {
  urgeTime: undefined,
  urgeContact: undefined,
  urgePerson: undefined,
  urgeTypeEnum: undefined,
  isTouch: undefined,
  remark: undefined
}
export const formConfig = [
  { type: 'datePicker', key: 'urgeTime', kind: 'datetime', label: '催收行动时间', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
  { type: 'select', slotName: 'urgeContact', key: 'urgeContact', label: '本次催收联系人', options: [], otherKeys: { value: 'id', label: 'contractName' } },
  { type: 'input', key: 'contractTel', label: '联系电话', disabled: true, placeholder: ' ' },
  { type: 'input', key: 'contractEmail', label: '联系邮箱', disabled: true, placeholder: ' ' },
  { type: 'input', key: 'urgePerson', label: '实际催收人' },
  { type: 'select', key: 'urgeTypeEnum', label: '催收类型', options: Object.keys(urgeTypeEnumOptions).map(key => ({ label: urgeTypeEnumOptions[key], value: key })) },
  { type: 'select', key: 'isTouch', label: '是否触达', options: [{ label: '否', value: '0' }, { label: '是', value: '1' }] },
  { type: 'input', key: 'remark', label: '备注' },
]
export const formRules = {
  urgeTime: [
    { required: true, message: '请选择催收行动时间', trigger: 'change' }
  ],
  urgeContact: [
    { required: true, message: '请选择本次催收联系人', trigger: 'change' }
  ],
  urgePerson: [
    { required: true, message: '请输入实际催收人', trigger: 'blur' }
  ],
  urgeTypeEnum: [
    { required: true, message: '请选择催收类型', trigger: 'change' }
  ],
  isTouch: [
    { required: true, message: '请选择是否触达', trigger: 'change' }
  ]
}

// 新建联系人-form
export const addFormData = {
  contractRelationshipEnum: undefined,
  contractName: undefined,
  contractTel: undefined,
  contractEmail: undefined,
  companyProvince: undefined,
  companyAddressDetails: undefined,
  houseProvince: undefined,
  houseAddress: undefined
}

// 联系人关系
export const relationOptions = {
  ACTUAL_CONTROLLER: '实控人',
  // LEGAL: '法人',
  SHAREHOLDER: '股东',
  OTHERS: '其他'
}
export const addFormConfig = [
  { type: 'select', key: 'contractRelationshipEnum', label: '联系人关系', options: Object.keys(relationOptions).map(key => ({ label: relationOptions[key], value: key })) },
  { type: 'input', key: 'contractName', label: '联系人姓名' },
  { type: 'input', key: 'contractTel', label: '联系电话' },
  { type: 'input', key: 'contractEmail', label: '联系邮箱' },
  { type: 'cascader', key: 'companyProvince', label: '公司地址', options: [], props: { value: 'code', label: 'name' } },
  { type: 'input', key: 'companyAddressDetails', label: ' ', placeholder: '请输入详细地址' },
  { type: 'cascader', key: 'houseProvince', label: '家庭地址', options: [], props: { value: 'code', label: 'name' } },
  { type: 'input', key: 'houseAddress', label: ' ', placeholder: '请输入详细地址'}
]
export const addFormRules = {
  contractRelationshipEnum: [
    { required: true, message: '请选择联系人关系', trigger: 'change' }
  ],
  contractName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' }
  ],
  contractTel: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { validator: vPhone2, trigger: 'blur' },
  ],
  contractEmail: [{ validator: vEmail, trigger: 'blur' }],
  companyProvince: [
    { required: true, message: '请选择公司地址', trigger: 'change' }
  ],
  companyAddressDetails: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
}
