// 新建用信-form
export const formData = {
  customerId: undefined,
  extOrderCode: undefined,
  orderAmount: undefined,
  creditAmount: undefined,
  businessType: undefined,
  organizationCode: undefined,
  projectId: undefined,
  ruleConfigId: undefined,
  fileList: undefined,
}
export const formConfig = [
  { type: 'select', key: 'customerId', label: '客户名称', loading: false, options: [], otherKeys: { label: 'customerName', value: 'id' }, filterable: true, remote: true, remoteMethod: null },
  { type: 'input', key: 'extOrderCode', label: '订单编号' },
  { type: 'inputNumber', key: 'orderAmount', label: '订单金额', precision: 2, min: 0.01 },
  { type: 'inputNumber', key: 'creditAmount', label: '赊销金额', precision: 2, min: 0.01 },
  { type: 'select', key: 'organizationCode', label: '额度来源', options: [], otherKeys: { label: 'salesAreaName', value: 'salesAreaCode' } },
  { type: 'select', key: 'projectId', label: '项目名称', options: [], otherKeys: { label: 'name', value: 'id' } },
  { type: null, key: 'title', label: '选择营销策略', isHidden: true },
  { type: 'select', key: 'ruleConfigId', label: '客户等级策略', options: [], isHidden: true, labelWidth: '150px' },
  { type: 'select', key: 'businessType', label: '业务类型策略', options: [], isHidden: true, labelWidth: '150px' },
  { type: null, key: 'fileList', label: '上传文件', slotName: 'fileList', isHidden: true },
]
export const formRules = {
  customerId: [
    { required: true, message: '请选择客户名称', trigger: 'change' }
  ],
  extOrderCode: [
    { required: true, message: '请输入订单编号', trigger: 'change' }
  ],
  orderAmount: [
    { required: true, message: '请输入订单金额', trigger: 'blur' }
  ],
  creditAmount: [
    { required: true, message: '请输入赊销金额', trigger: 'blur' }
  ],
  organizationCode: [
    { required: true, message: '请选择额度来源', trigger: 'change' }
  ],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'change' }
  ],
  ruleConfigId: [
    { required: true, message: '请选择产品策略', trigger: 'change' }
  ]
}
