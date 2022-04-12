import { projectType, projectPartnerType, projectShareholderType } from '@/utils/enums'

// 付款节点 预付款、货到款、验收款、质保金
export const paymentNodeList = [{value: 1, label: '预付款'}, {value: 2, label: '货到款'}, {value: 3, label: '验收款'}, {value: 4, label: '质保金'}]
// 付款方式 现金、银票、商票、以房抵票
export const paymentWayList = [{value: 1, label: '现金'}, {value: 2, label: '银票'}, {value: 3, label: '商票'}, {value: 4, label: '以房抵票'}]
// 付款金额计算方式 按金额 按比例
export const caculateWayList = [{value: 1, label: '按比例'}, {value: 2, label: '按金额'}]
// 项目来源 1&2：项目管理；3：应收管家
export const projectSoueceMap = {1: '项目管理', 2: '项目管理', 3: '应收管家'}

export const basicFormData = {
  extId: undefined,
  name: undefined,
  customerId: undefined,
  addressCode: undefined,
  detailAddress: undefined,
  projectCompany: undefined,
  projectType: undefined,
  projectPartnerName: undefined,
  projectPartnerType: undefined,
  projectShareholderType: undefined,
  remark: undefined,
}

const areaProps = {
  value: 'code',
  label: 'name',
}
// export const basicFormConfig = (remoteMethod, remoteMethod1) => {
export const basicFormConfig = (remoteMethod) => {
  return [
    { type: 'input', key: 'extId', label: '外部编号' },
    { type: 'input', key: 'name', label: '项目名称', maxlength: 50 },
    { type: 'select', key: 'customerId', label: '客户名称', filterable: true, remote: true, otherKeys: { label: 'customerName', value: 'id' }, remoteMethod, options: [] },
    { type: 'cascader', key: 'addressCode', label: '项目地址', options: [], props: areaProps },
    { type: 'input', key: 'detailAddress', label: '详细地址', maxlength: 500 },
    { type: 'select', key: 'projectType', label: '项目类型', options: Object.keys(projectType).map(key => ({ label: projectType[key], value: parseInt(key) })) },
    // { type: 'select', key: 'projectCompany', label: '项目方名称', filterable: true , remote: true, otherKeys: { label: 'Name', value: 'CreditCode' }, remoteMethod: remoteMethod1, options: [] },
    { type: 'input', key: 'projectPartnerName', label: '项目方名称' },
    { type: 'select', key: 'projectPartnerType', label: '项目方类型', options: Object.keys(projectPartnerType).map(key => ({ label: projectPartnerType[key], value: parseInt(key) })) },
    { type: 'input', key: 'projectCompany', label: '项目方公司名称' },
    { type: 'select', key: 'projectShareholderType', label: '项目股东性质', options: Object.keys(projectShareholderType).map(key => ({ label: projectShareholderType[key], value: parseInt(key) })) },
    { type: 'input', key: 'remark', label: '备注' },
  ]
}
export const basicFormRules = {
  customerId: [
    { required: true, message: '请输入客户', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入项目名称', trigger: 'blur' }
  ],
  addressCode: [
    { required: true, message: '请选择项目地址', trigger: 'blur' }
  ],
  detailAddress: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
}

export const surveyFormData = {
  buildingArea: undefined,
  totalCostAmount: undefined,
  projectDuration: undefined,
  projectCycle: undefined,
  contractAmount: undefined,
  projectCollectedAmount: undefined,
}
export const surveyFormConfig = [
  { type: 'input', key: 'buildingArea', label: '建筑面积（平方米）'},
  { type: 'inputNumber', key: 'totalCostAmount', label: '总造价金额（万元）', precision: 6, step: 0.1, min: 0},
  { type: 'datePicker', key: 'projectDuration', label: '项目工期', kind: 'daterange'},
  { type: 'input', key: 'projectCycle', label: '项目周期（天）'},
  { type: 'inputNumber', key: 'contractAmount', label: '项目合同金额（万元）', precision: 6, step: 0.1, min: 0},
  { type: 'inputNumber', key: 'projectCollectedAmount', label: '当前已回款金额（万元）', precision: 2, step: 0.1, min: 0},
]

export const collapseItems = [
  { key: 'a1', label: '项目基本信息' },
  { key: 'a2', label: '项目概况' },
  { key: 'a3', label: '项目文件' },
  { key: 'a5', label: '合同信息' },
  { key: 'a4', label: '项目预计回款信息' },
]
