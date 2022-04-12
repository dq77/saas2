// 金额校验
const numberHandle = (rule, value, callback, info) => {
  const exp = /^([1-9][\d]{0,10}|0)(\.[\d]{1,5})?$/
  if (!exp.test(value)) {
    return callback(new Error('请输入正确金额'))
  }
  callback()
}
// 年份校验
const yearHandle = (rule, value, callback, info) => {
  const exp = /^[+]{0,1}(\d+)$/
  if (!exp.test(value)) {
    return callback(new Error('请输入正确年份'))
  }
  callback()
}
// 历史出货金额默认值
export const shipmentHistoryDefault = {
  year: undefined,
  shipment: undefined
}
// 默认评估表单值
export const formData = {
  shipmentHistory: undefined,
  expectedShipment: undefined,
  housePropertyValue: undefined,
  cooperationPeriod: undefined,
}
// 标准评估额外字段
export const standardFormData = {
  representativeIsController: undefined,
  actualController: undefined,
}
// 默认评估表单校验规则
export const formRules = {
  shipmentHistory: [
    { required: true, message: '请输入历史出货金额', trigger: ['blur', 'change'] },
  ],
  expectedShipment: [
    { required: true, message: '请输入金额', trigger: ['blur', 'change'] },
    { validator: (rule, value, callback) => numberHandle(rule, value, callback), trigger: 'blur' }
  ],
  housePropertyValue: [
    { required: true, message: '请输入金额', trigger: ['blur', 'change'] },
    { validator: (rule, value, callback) => numberHandle(rule, value, callback), trigger: 'blur' }
  ],
  cooperationPeriod: [
    { required: true, message: '请输入数字', trigger: ['blur', 'change'] },
    { validator: (rule, value, callback) => yearHandle(rule, value, callback), trigger: 'blur' }
  ],
}
// 资料包校验规则
export const fileListRules = [
  { required: true, message: '请上传资料包', trigger: ['blur', 'change'] },
]
// 历史出货金额表单配置
export const formConfig = [
  { key: 'shipmentHistory', label: '历史出货金额', slotName: 'shipmentHistory' },
  { type: 'input', key: 'expectedShipment', label: '本年预计出货金额', inputAppend: 'unit', width: '500px' },
  { type: 'input', key: 'housePropertyValue', label: '企业下房产总价值（含企业主）', inputAppend: 'unit', width: '500px' },
  { type: 'input', key: 'cooperationPeriod', label: '经销商合作年限', inputAppend: 'year', width: '500px' },
]
// 标准评估额外字段
export const standardFormConfig = [
  {
    type: 'radio',
    key: 'representativeIsController',
    label: '法定代表人是否为实控人',
    options: [
      { label: '是', value: 'Y' },
      { label: '否', value: 'N' }
    ]
  },
  { type: 'input', key: 'actualController', label: '企业实控人姓名', isHidden: true, width: '500px' },
]
// 标准评估额外字段校验
export const standardFromRules = {
  actualController: [
    { required: true, message: '请填写企业实控人姓名', trigger: ['blur', 'change'] },
  ],
  representativeIsController: [
    { required: true, message: '请选择法定代表人是否为实控人', trigger: ['change'] },
  ]
}
// 历史出货金额配置
export const shipmentHistoryFormConfig = [
  {
    type: 'select',
    key: 'year',
    label: '年份',
    options: [
      {
        label: '2018年',
        value: '2018'
      },
      {
        label: '2019年',
        value: '2019'
      },
      {
        label: '2020年',
        value: '2020'
      },
      {
        label: '2021年',
        value: '2021'
      },
    ],
    rules: [
      { required: true, message: '请选择年份', trigger: 'change' },
    ],
    span: 12
  },
  {
    type: 'input',
    key: 'shipment',
    label: '出货金额',
    inputAppend: 'unit',
    rules: [
      { required: true, message: '请输入金额', trigger: ['blur', 'change'] },
      { validator: (rule, value, callback) => numberHandle(rule, value, callback), trigger: 'blur' }
    ],
    span: 12
  },
]
// 文件上传、查看
export const fileAction = {
  upload: '/partner/common/file/upload',
  check: '/partner/common/file/download?fileKey='
}
