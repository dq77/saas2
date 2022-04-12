// 新建催收记录-form
export const formData = {
  customerName: undefined,
  remainReceivableAmount: undefined,
  overdueAmount: undefined,
  returnDate: undefined,
  bankSerialNo: undefined,
  returnAmount: undefined,
  saArmBusinessFileList: undefined,
  remark: undefined
}
export const formConfig = [
  { type: 'text', key: 'customerName', label: '客户名称' },
  { slotName: 'remainReceivableAmount', key: 'remainReceivableAmount', label: '剩余应收总金额' },
  { slotName: 'overdueAmount', key: 'overdueAmount', label: '逾期总金额' },
  { type: 'datePicker', key: 'returnDate', kind: 'date', label: '回款日期', pickerOptions: { disabledDate(time) { return time.getTime() > Date.now() } } },
  { type: 'input', key: 'bankSerialNo', label: '银行流水号' },
  { type: 'input', key: 'returnAmount', label: '本次回款金额', kind: 'number' },
  { slotName: 'saArmBusinessFileList', key: 'saArmBusinessFileList', label: '附件(凭证)' },
  { type: 'input', key: 'remark', label: '备注' },
]
export const formRules = {
  returnDate: [
    { required: true, message: '请选择回款日期', trigger: 'change' }
  ],
  bankSerialNo: [
    { required: true, message: '请输入银行流水号', trigger: 'blur' }
  ],
  returnAmount: [
    { required: true, message: '请选择本次回款金额', trigger: 'blur' }
  ],
  saArmBusinessFileList: [
    { required: true, message: '请上传附件(凭证)', trigger: 'blur' }
  ]
}
