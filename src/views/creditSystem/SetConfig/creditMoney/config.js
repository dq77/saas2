import { toAmountStr } from '@/utils/util'

const vTotal = (rule, value, callback) => {
  const reg = /^\d{1,10}([.][0-9]{1,2})?$/
  if (!reg.test(value) || value === 0) {
    callback(new Error('请输入0 - 100亿之间的金额，小数点最多两位'))
  } else {
    callback()
  }
}

// 列表配置
export const columns = [
  { label: '销售组织名称', key: 'accountName' },
  { label: '年度可支配授信额度', key: 'creditLine', align: 'right', render: (row, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '额度状态', key: 'creditStatus', align: 'right' },
  { label: '操作', key: 'operate', align: 'right' }
]

export const mFormData = { creditLine: null }

export const mFormConfig = [
  { type: 'inputNumber', key: 'creditLine', label: '授信总额度(元)', min: 0, precision: 2 }
]

export const mFormRules = {
  creditLine: [
    { required: true, message: '请输入授信总额度', trigger: ['change', 'blur'] },
    { validator: vTotal, trigger: ['blur'] },
  ]
}
// ---------------- 添加授信额度表单信息 -----------------------
export const formData = { creditSourceId: undefined, creditLine: undefined }
export const formConfig = [
  { type: 'select', key: 'creditSourceId', label: '销售组织', options: [], otherKeys: { label: 'name', value: 'id' }, disabled: false },
  { type: 'inputNumber', key: 'creditLine', label: '授信总额度(元)', min: 0, precision: 2 }
]
export const formRules = {
  creditSourceId: [{ required: true, message: '请选择销售组织', trigger: 'blur' }],
  creditLine: [
    { required: true, message: '请输入授信总额度', trigger: ['blur'] },
    { validator: vTotal, trigger: ['blur'] },
  ]
}
// ---------------- 添加授信额度表单信息 -----------------------

// ---------------- 添加销售组织及授信额度 -----------------------
export const checkFormData = { code: undefined, name: undefined, creditLine: undefined }
export const checkFormConfig = [
  { type: 'input', key: 'code', label: '销售组织编号' },
  { type: 'input', key: 'name', maxlength: 50, label: '销售组织名称' },
  { type: 'inputNumber', key: 'creditLine', label: '授信总额度(元)', min: 0, precision: 2 }
]
export const checkFormRules = {
  code: [{ required: true, message: '请输入销售组织编号', trigger: ['blur'] }],
  name: [{ required: true, message: '请输入销售组织名称', trigger: ['blur'] }],
  creditLine: [
    { required: true, message: '请输入授信总额度', trigger: ['blur'] },
    { validator: vTotal, trigger: ['blur'] },
  ]
}
// ---------------- 添加销售组织及授信额度 -----------------------

export const info = '可根据企业下属销售组织的业绩情况设置适用于销售组织的年度授信额度；即，隶属于该销售组织的客户(如，经销商)在申请赊销额度时需要将额度来源设置为对应的销售组织。如果，企业没有销售组织也可以不设置'
