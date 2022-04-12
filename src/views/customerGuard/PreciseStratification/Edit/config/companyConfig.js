// const areaProps = {
//   value: 'code',
//   label: 'name',
// }
const regStatus = {
  存续: '存续',
  在营: '在营',
  开业: '开业',
  在册: '在册',
}
// const companyType = {
//   1: '有限责任公司(自然人投资)',
//   2: '有限责任公司（法人独资）',
// }
const businessAddressOwnership = {
  租赁: '租赁',
  自有: '自有'
}

export const cFormConfig = [
  { type: 'input', key: 'creditCode', label: '统一社会信用代码', span: 12 },
  { type: 'datePicker', key: 'estiblishTime', label: '成立日期', span: 12, },
  { type: 'select', key: 'regStatus', label: '经营状态', span: 12, options: Object.keys(regStatus).map(key => ({ label: regStatus[key], value: key })) },
  { type: 'input', key: 'companyType', label: '公司类型', span: 12, },
  { type: 'input', key: 'regCapital', label: '注册资本(万)', span: 12 },
  { type: 'input', key: 'actualCapital', label: '实缴资本(万)', span: 12 },
  { type: 'longDatePicker', key: 'time', label: '营业期限', span: 12, longStart: 'fromTime', longEnd: 'toTime', isLong: 'isLong' },
  { type: 'input', key: 'regInstitute', label: '登记机关', span: 12 },
  { type: 'inputNumber', key: 'cooperatePeriod', label: '合作年限(年)', span: 12 },
  { type: 'select', key: 'businessAddressOwnership', label: '经营地址所属', span: 12, options: Object.keys(businessAddressOwnership).map(key => ({ label: businessAddressOwnership[key], value: key })) },
  { type: 'input', key: 'regLocation', label: '注册地址', span: 12 },
  { type: 'input', key: 'businessAddress', label: '经营地址', span: 12 },
  // { type: 'cascader', key: 'registAddress', label: '注册地址', options: [], props: areaProps, span: 12, render: (row) => row.province + row.city + row.area},
  // { type: 'input', key: 'registAddressDetail', label: '注册详细地址', span: 12 },
  // { type: 'cascader', key: 'mangerAddress', label: '经营地址', options: [], props: areaProps, span: 12, render: (row) => row.province + row.city + row.area},
  // { type: 'input', key: 'mangerAddressDetail', label: '经营详细地址', span: 12 },
]
export const cFormData = {
  creditCode: undefined,
  estiblishTime: undefined,
  regStatus: undefined,
  companyType: undefined,
  regCapital: undefined,
  actualCapital: undefined,
  time: {
    fromTime: undefined,
    toTime: undefined,
    isLong: false,
  },
  regInstitute: undefined,
  cooperatePeriod: undefined,
  businessAddressOwnership: undefined,
  regLocation: undefined,
  businessAddress: undefined,
}
export const cFormRules = {
  creditCode: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
  ],
  cooperateTime: [
    { required: true, message: '请输入合作年限', trigger: 'blur' }
  ],
  businessAddress: [
    { required: true, message: '请输入经营地址', trigger: 'blur' }
  ],
  businessAddressOwnership: [
    { required: true, message: '请选择经营地址所属', trigger: ['change', 'blur'] }
  ],
}
export const columns = [
  { label: '姓名', key: 'name', type: 'input', },
  { label: '持股比例', key: 'capitalPercent', type: 'input' },
  { label: '认缴出资额(万元)', key: 'capitalAmomon', type: 'input', },
  { label: '实缴出资额(万元)', key: 'capitalActlAmomon', type: 'input', },
  { label: '操作', key: 'operate', minWidth: 30 },
]

// 可编辑table的插入行默认数据
export const dataSample = {
  name: undefined,
  capitalPercent: undefined,
  capitalAmomon: undefined,
  capitalActlAmomon: undefined,
  // isDeleted: '0'
}

export const uploadFromData = {
  remark: undefined,
  fileList: undefined,
}

export const uploadFormConfig = [
  { type: null, key: 'remark', label: '银行流水时间段', slotName: 'remark' },
  { type: null, key: 'fileList', label: '上传银行流水', slotName: 'fileList' },
]

// 初始化规则
export const uploadFormRules = {
  remark: [
    { required: true, message: '请提供距今3个月内，周期大于6个月的流水', trigger: ['blur', 'change'] }
  ],
  fileList: [
    { required: true, message: '请上传银行流水', trigger: ['blur', 'change'] }
  ],
}
