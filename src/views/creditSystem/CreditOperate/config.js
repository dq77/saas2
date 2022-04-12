import { payStatus } from '@/consts'

export const cFormData = { methodFunction: undefined, logLevel: undefined, repayStatus: undefined }

export const cFormRules = {
  customerId: [
    { required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }
  ],
  organizationCode: [
    { required: true, message: '请选择销售组织名称', trigger: ['blur', 'change'] }
  ],
  repayStatus: [
    { required: true, message: '请选择还款状态', trigger: ['blur', 'change'] }
  ]
}

export const getFormConfig = (remoteMethod) => {
  return [
    { type: 'select', key: 'customerId', label: '客户名称', loading: false, options: [], filterable: true, remote: true, otherKeys: { label: 'customerName', value: 'id' }, remoteMethod },
    { type: 'select', key: 'organizationCode', label: '销售组织名称', filterable: true, options: [], otherKeys: { label: 'name', value: 'code' } },
    { type: 'select', key: 'repayStatus', label: '还款状态', options: payStatus }
  ]
}

export const columns = [
  { label: '订单编号', key: 'extOrderCode' },
  { label: '发货编号', key: 'extDeliveryCode' },
  { label: '最后还款时间', key: 'debtEndTime' },
  { label: '赊销金额', key: 'loanAmount' },
  { label: '剩余还款金额', key: 'repaymentAmount' },
  { label: '本次还款金额', key: 'refundAmount', type: 'inputNumber', min: 0, max: 'repaymentAmount', precision: 2 },
]

export const uploadFromData = {
  fileList: undefined,
}

export const uploadFormConfig = [
  { type: null, key: 'fileList', label: '上传文件', slotName: 'fileList', isHidden: false },
]
