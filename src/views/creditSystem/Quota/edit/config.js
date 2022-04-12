
import { deepCopy } from '@/utils/qjd'
// 所有动态表单配置
const configs = {
  customerId: { type: 'select', key: 'customerId', label: '选择客户', loading: false, filterable: true, remote: true, options: [], otherKeys: { label: 'customerName', value: 'id' }, remoteMethod: null },
  salesAreaCode: { type: 'select', key: 'salesAreaCode', label: '额度来源', filterable: true, options: [], otherKeys: { label: 'salesAreaName', value: 'salesAreaCode' } },
  salesAreaAmount: { type: 'text', key: 'salesAreaAmount', label: '销区年度总额', isHidden: false },
  validTo: { type: 'datePicker', key: 'validTo', label: '额度失效时间', pickerOptions: { disabledDate(time) { return time.getTime() < Date.now() } }, valueFormat: 'yyyy-MM-dd'},
  creditAmount: { type: 'inputNumber', key: 'creditAmount', label: '申报授信金额', min: 0 },
  fileList: { type: null, key: 'fileList', label: '上传文件', slotName: 'fileList', isHidden: false },
  description: { type: 'input', key: 'description', kind: 'textarea', label: '备注' },
  projectId: { type: 'select', key: 'projectId', label: '选择项目', options: [], otherKeys: { label: 'name', value: 'id' } },
  proAddress: { type: 'text', key: 'proAddress', label: '项目地址' },
  contractAmount: { type: 'text', key: 'contractAmount', label: '累积合同金额' },
  projectCompany: { type: 'text', key: 'projectCompany', label: '项目方公司', isHidden: false },
  contractCode: { type: 'select', key: 'contractCode', label: '合同编号', options: [], otherKeys: { label: 'contractCode', value: 'contractCode' } },
  contractName: { type: 'text', key: 'contractName', label: '合同名称' },
  signingDate: { type: 'text', key: 'signingDate', label: '合同签署日期' },
  amount: { type: 'text', key: 'amount', label: '合同金额' }
}
// 获取表单配置
const getConfigs = (data) => {
  const arr = []
  data.forEach(item => {
    const config = deepCopy(configs[item.key])
    if (item.label) {
      config.label = item.label
    }
    arr.push(config)
  })
  return arr
}
// - 经销商授信 || 直签授信 || 临时授信 表单配置-key
const dtDatas = [
  { key: 'customerId' },
  { key: 'salesAreaCode' },
  { key: 'salesAreaAmount' },
  { key: 'validTo' },
  { key: 'creditAmount' },
  { key: 'fileList' },
  { key: 'description' }
]
// - 项目授信 || 直签使用授信 表单配置-key
const dpDatas = [
  { key: 'customerId' },
  { key: 'projectId' },
  { key: 'proAddress' },
  { key: 'contractAmount' },
  { key: 'projectCompany' },
  { key: 'salesAreaCode' },
  { key: 'salesAreaAmount' },
  { key: 'contractCode' },
  { key: 'contractName' },
  { key: 'amount' },
  { key: 'signingDate' },
  { key: 'creditAmount' },
  { key: 'validTo', label: '项目有效期' },
  { key: 'fileList' },
  { key: 'description' },
]
// - 经销商授信 || 直签授信 || 临时授信 表单配置
const dtConfigs = getConfigs(dtDatas)
// - 项目授信 || 直签使用授信 表单配置
const dpConfigs = getConfigs(dpDatas)
// 授信模式对应配置
export const types = {
  // - 经销商授信 || 直签授信 || 临时授信
  dealer_credit: dtConfigs,
  direct_sign_credit: dtConfigs,
  temporary_credit: dtConfigs,
  // - 项目授信 || 直签使用授信
  project_credit: dpConfigs,
  direct_sign_use_credit: dpConfigs
}
export const typeDatas = [
  { type: 'project_credit', kind: 'project_credit', title: '项目授信', content: '在年度授信不足的时候，客户可以使用基于项目申请的项目授信额度。此额度只能在指定有效期内（一般在项目完结前）用于该项目的开单，且不能循环使用' },
  { type: 'dealer_credit', kind: 'dealer_credit', title: '经销商授信', content: '基于企业给客户分配的年度固定额度；客户可以在1年有效期内循环使用年度额度。该额度使用不受项目限制，可跨项目使用' },
  { type: 'direct_sign_credit', kind: 'direct_sign_credit', title: '直签授信', content: '客户向企业成功申请直签授信额度不能直接使用，但可以将直签授信额度分配给与客户发生项目关系的下游企业(即，与客户发生项目关系的下游企业客户可以发起“直签使用授信”申请)' },
  { type: 'temporary_credit', kind: 'temporary_credit', title: '临时授信', content: '适用于客户在紧急情况下使用的授信额度类型，为有效期内的一次性使用额度' },
  { type: 'direct_sign_use_credit', kind: 'direct_sign_credit', title: '直签使用授信', content: '当客户A向企业拿到直签授信额度后，客户A可以将直签授信额度再次分配给与之发生项目关系的下游客户B；此额度只能在项目指定的有效期内用于该项目的开单，且不能循环使用' }
]
// 初始化数据
export const cFormData = {
  creditType: undefined,
  startUserDeptId: undefined,
  fileList: null,
  customerId: undefined,
  customerName: undefined,
  salesAreaCode: undefined,
  validTo: undefined,
  creditAmount: undefined,
  description: undefined,
  projectId: undefined,
  projectName: undefined,
  contractCode: undefined,
  parentCreditSourceId: undefined,
  salesAreaAmount: undefined,
  contractName: undefined,
  signingDate: undefined,
  amount: undefined
}
// 初始化配置
export const cFormConfig = [
  { type: 'select', key: 'startUserDeptId', label: '组织名称', options: [], otherKeys: { label: 'departmentName', value: 'departmentId' }, isHidden: true },
  { type: 'select', key: 'parentCreditSourceId', label: '直签额度客户', options: [], isHidden: true, otherKeys: { label: 'customerName', value: 'customerId' } }
]
// 初始化规则
export const cFormRules = {
  creditType: [
    { required: true, message: '请选择授信类型', trigger: ['blur', 'change'] }
  ],
  startUserDeptId: [
    { required: true, message: '请选择组织名称', trigger: ['blur', 'change'] }
  ],
  customerId: [
    { required: true, message: '请选择客户', trigger: 'change' }
  ],
  projectId: [
    { required: true, message: '请选择项目', trigger: 'change' }
  ],
  validTo: [
    { required: true, message: '请输入失效日期', trigger: 'change' }
  ],
  creditAmount: [
    { required: true, message: '请输入授信额度', trigger: ['blur'] }
  ],
  salesAreaCode: [
    { required: true, message: '请选择额度来源', trigger: 'change' }
  ],
  // 屏蔽合同编号必填
  // contractCode: [
  //   { required: true, message: '请选择合同编号', trigger: 'change' }
  // ],
  parentCreditSourceId: [
    { required: true, message: '请选择直签额度客户', trigger: 'change' }
  ]
}
// 各授信模式接口入参
export const typeParams = {
  // 经销商授信
  dealer_credit: [
    'creditType',
    'customerId',
    'customerName',
    'salesAreaCode',
    'validTo',
    'creditAmount',
    'description',
    'fileList',
    'startUserDeptId'
  ],
  // 直签授信
  direct_sign_credit: [
    'creditType',
    'customerId',
    'customerName',
    'salesAreaCode',
    'validTo',
    'creditAmount',
    'description',
    'fileList',
    'startUserDeptId'
  ],
  // 临时授信
  temporary_credit: [
    'creditType',
    'customerId',
    'customerName',
    'salesAreaCode',
    'validTo',
    'creditAmount',
    'description',
    'fileList',
    'startUserDeptId'
  ],
  // 项目授信
  project_credit: [
    'creditType',
    'customerId',
    'customerName',
    'salesAreaCode',
    'validTo',
    'creditAmount',
    'description',
    'fileList',
    'startUserDeptId',
    'projectId',
    'projectName',
    'contractCode',
  ],
  // 直签使用授信
  direct_sign_use_credit: [
    'creditType',
    'customerId',
    'customerName',
    'salesAreaCode',
    'validTo',
    'creditAmount',
    'description',
    'fileList',
    'startUserDeptId',
    'projectId',
    'projectName',
    'contractCode',
    'parentCreditSourceId',
  ]
}
