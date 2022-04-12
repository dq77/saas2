// 新建用信-form
export const creditFormData = {
  extOrderCode: undefined,
  extDeliveryCode: undefined,
  loanAmount: undefined,
  customerName: undefined,
  projectName: undefined,
  time: undefined,
  fileList: undefined,
}
export const creditFormConfig = [
  { type: 'input', key: 'extOrderCode', label: '订单编号' },
  { type: 'input', key: 'extDeliveryCode', label: '发货单号' },
  { type: 'inputNumber', key: 'loanAmount', label: '应收账款金额', precision: 2, min: 0 },
  { type: 'text', key: 'customerName', label: '客户名称' },
  { type: 'text', key: 'projectName', label: '项目名称' },
  { type: 'text', key: 'time', label: '还款周期' },
  { type: null, key: 'fileList', label: '上传文件', slotName: 'fileList', isHidden: false },
]
export const creditFormRules = {
  extOrderCode: [
    { required: true, message: '请输入订单编号', trigger: 'change' }
  ],
  extDeliveryCode: [
    { required: true, message: '请输入发货单号', trigger: 'change' }
  ],
  loanAmount: [
    { required: true, message: '请输入应收账款金额', trigger: 'blur' }
  ]
}
