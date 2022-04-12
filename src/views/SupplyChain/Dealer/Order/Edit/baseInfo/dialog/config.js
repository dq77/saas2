/* eslint-disable */

// import { purchaseTypeMode } from '@/utils/enumsSaas'
import { vProjectId, vFreightPayId, enumToOption } from '../../util'

export const formConfig = [
  {
    key: 'projectId', label: '项目', type: 'select', isHidden: false, disabled: false,
    filterable: true,
    loading: false,
    options: [],
    valueKey: 'projectId',
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'paymentMethod', label: '付款条件', type: 'select', isHidden: false, disabled: true,
    filterable: true,
    options: [],
    valueKey: 'dictCode',
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'creditAmount', label: '可用赊销额度', slotName: 'creditAmount', isHidden: true, disabled: false,
  },
  {
    key: 'businessTypeCode', label: '业务类型', type: 'select', isHidden: true, disabled: false,
    options: [],
    valueKey: 'code',
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'ruleConfig', label: '产品策略', type: 'select', isHidden: true, disabled: false,
    options: [],
    valueKey: 'code',
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'creditFileList', label: '赊销相关文件', slotName: 'creditFileList', isHidden: true, disabled: false,
  },
  {
    key: 'moneyOrderList', label: '汇款单', slotName: 'moneyOrderList', isHidden: false, disabled: false,
  },
  {
    key: 'receiptPerson', label: '收货人', slotName: 'receiptPerson', isHidden: false, disabled: false,
    filterable: true,
    loading: false,
    options: [],
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'receiptPhone', label: '收货人电话', type: 'select', isHidden: false, disabled: false,
    filterable: true,
    allowCreate: true,
    options: [],
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'sendTime', label: '期望发货日期', type: 'datePicker', isHidden: false, disabled: false,
    valueFormat: 'yyyy-MM-dd'
  },
  {
    key: 'receiveTime', label: '期望提货日期', type: 'datePicker', isHidden: false, disabled: false,
    valueFormat: 'yyyy-MM-dd'
  },
  {
    key: 'addressNameText', label: '收货地址', type: 'input', isHidden: false, disabled: true,
  },
  {
    key: 'address', label: '详细地址', type: 'input', isHidden: false, disabled: true,
  },
  {
    key: 'invoiceCompany', label: '开票信息', type: 'select', isHidden: false, disabled: true,
    filterable: true,
    // remote: true,
    // remoteMethod: null,
    loading: false,
    options: [],
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'freightPayId', label: '运费支付方式', type: 'select', isHidden: false, disabled: false,
    filterable: true,
    options: [],
    valueKey: 'dictCode',
    otherKeys: { label: 'label', value: 'value' },
  },
  {
    key: 'freightPayDescription', label: ' ', type: 'input', isHidden: true, disabled: false,
  },
  {
    key: 'description', label: '备注', type: 'input', isHidden: false, disabled: false,
  },
]

export const getFormRules = ({
  vPaymentMethod,
  vFreightPayDescription,
  vCreditFileList,
}) => {
  return {
    // purchaseType: [
    //   { required: true, message: '请选择采购模式', trigger: ['blur'] },
    // ],
    customerId: [
      { required: true, message: '请选择客户', trigger: ['blur'] },
    ],
    projectId: [
      { required: true, message: '请选择项目', trigger: ['blur'], validator: vProjectId },
    ],
    paymentMethod: [
      { required: true, trigger: ['blur'], validator: vPaymentMethod },
    ],
    businessTypeCode: [
      { required: true, message: '请选择业务类型', trigger: ['blur'] },
    ],
    ruleConfig: [
      { required: true, message: '请选择产品策略', trigger: ['blur'] },
    ],
    creditFileList: [
      { required: true, message: '请上传必填文件', trigger: ['blur'], validator: vCreditFileList },
    ],
    receiptPerson: [
      { required: true, message: '请选择收货人', trigger: ['blur'] },
    ],
    receiptPhone: [
      { required: true, message: '请选择收货人电话', trigger: ['blur'] },
    ],
    sendTime: [
      { required: true, message: '请选择期望发货日期', trigger: ['blur'] },
    ],
    receiveTime: [
      { required: true, message: '请选择期望提货日期', trigger: ['blur'] },
    ],
    addressNameText: [
      { required: true, message: '请选择收货地址', trigger: ['blur'] },
    ],
    address: [
      { required: true, message: '请输入详细地址', trigger: ['blur'] }
    ],
    invoiceCompany: [
      { required: true, message: '请选择开票信息', trigger: ['blur'] }
    ],
    freightPayId: [
      { required: true, message: '请选择运费支付方式', trigger: ['blur'], validator: vFreightPayId }
    ],
    freightPayDescription: [
      { message: '请输入付款备注', trigger: ['blur'], validator: vFreightPayDescription }
    ],
  }
}

export const formData = {
  // purchaseType: '1', // 采购方式
  customerId: null,
  projectId: {},
  paymentMethod: {},
  moneyOrderList: {
    fileList: []
  },
  paymentMethodKeyId: null,
  creditAmount: null,

  receiptPerson: null,
  receiptPhone: null,
  sendTime: null,
  receiveTime: null,
  addressCode: [],
  addressName: [],
  addressNameText: null,
  address: null,
  invoiceCompany: null,
  freightPayId: {},
  freightPayDescription: null, // 运费支付方式为厂家有条件承担时需要输入的补充说明，非必填
  description: null,

  // 赊销相关字段
  businessTypeConfigEnabled: false,
  customerLevelConfigEnabled: false,
  approvalMaterialsEnabled: false,
  businessTypeCode: null,
  ruleConfig: null,
  creditFileList: null,
}
