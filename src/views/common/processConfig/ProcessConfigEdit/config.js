export const defaultNode = {
  hasError: false,
  id: '',
  nodeName: '审批节点',
  active: false,
  approverType: '',
  approver: [],
  operationPass: '',
  operationNoPass: ''
}

export const cFormRules = {
  nodeName: [
    { required: true, message: '请输入节点名称', trigger: ['blur', 'change'] }
  ],
  approver: [
    { required: true, message: '请选择审批人', trigger: ['blur', 'change'] }
  ],
  operationPass: [
    { required: false, message: '请选择操作', trigger: ['blur', 'change'] }
  ],
  operationNoPass: [
    { required: true, message: '请选择操作', trigger: ['blur', 'change'] }
  ],
}

const approverOptions = [
  {
    value: 1,
    label: '按人员'
  },
  {
    value: 3,
    label: '按角色'
  },
]

export const getFormConfig = () => {
  return [
    { type: 'input', key: 'nodeName', label: '节点名称', span: 24 },
    { slotName: 'fixedFlow', key: 'fixedFlow', label: '', span: 24, isHidden: true },
    { type: 'select', key: 'approverType', label: '审批人', options: approverOptions, span: 24},
    { type: 'select', key: 'approver', label: '', options: [], filterable: true, otherKeys: { label: 'label', value: 'value' }, multiple: true, collapseTags: true, clearable: true, span: 24},
    { slotName: 'nodePass', key: 'nodePass', label: '', span: 24 },
    { type: 'select', key: 'operationPass', label: '操作', options: [], span: 24, filterable: true},
    { slotName: 'nodePassTips', key: 'nodePassTips', label: '', span: 24, isHidden: true },
    { slotName: 'nodeNoPass', key: 'nodeNoPass', label: '', span: 24 },
    { type: 'select', key: 'operationNoPass', label: '操作', options: [], span: 24, filterable: true},
    { slotName: 'nodeNoPassTips', key: 'nodeNoPassTips', label: '', span: 24, isHidden: true },
  ]
}

// 第一个节点审批人固定值
export const fixedFlow = [
  // 'creditApply', // 赊销额度申报
  'saasPeriodDays', // 更改还款周期
  'creditRepayment' // 还款审批
]
