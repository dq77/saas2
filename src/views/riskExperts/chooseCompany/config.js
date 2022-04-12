export const modeData = {
  fast: '请选择被评估的客户',
  standard: '请选择被评估的客户',
  accurate: '请选择被评估的客户',
}
export const formData = {
  customerName: undefined,
  uniformCreditCode: undefined,
  corporateRepresentative: undefined,
  actualController: undefined,
}
export const formRules = {
  customerName: [
    { required: true, message: '请输入公司全称/简称/关键字', trigger: ['blur', 'change'] },
  ],
  actualController: [
    { required: false, message: '请输入实控人姓名', trigger: ['blur', 'change'] },
  ],
}
export const fastRules = {
  required: true,
  message: '请输入实控人姓名',
  trigger: ['blur', 'change']
}
export const formConfig = ({mode}) => [
  { key: 'customerName', label: '公司全称/简称/关键字', slotName: 'customerName', span: mode === 'fast' ? 10 : 20 },
  { type: 'input', key: 'actualController', label: '实控人姓名', isHidden: true, span: 10 },
]
export const nextRoute = {
  fast: 'processLoading',
  standard: 'uploadMaterials',
  accurate: 'processLoading'
}
