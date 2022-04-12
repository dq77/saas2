import moment from 'moment'
const getSelectOption = (enums) => {
  const options = []
  for (const i in enums) {
    options.push({
      label: enums[i],
      value: i
    })
  }
  return options
}
export const modeEnums = {
  FAST_MODE: 'fast',
  STANDARD_MODE: 'standard',
  ACCURATE_MODE: 'accurate',
}
export const authRoutes = {
  STANDARD_MODE: 'normalAuth',
  ACCURATE_MODE: 'accurateAuth'
}
export const resultRoutes = {
  FAST_MODE: 'fastResult',
  STANDARD_MODE: 'normalResult',
  ACCURATE_MODE: 'accurateResult',
}
const evaluationModeEnums = {
  FAST_MODE: '快速评估',
  STANDARD_MODE: '标准评估',
  ACCURATE_MODE: '精准评估'
}
const evaluationStatusEnums = {
  WAIT_SUBMIT: '待提交',
  SUPPLEMENT_INFO: '补充资料',
  EVALUATING: '评估中',
  REPEAT_AUTH: '驳回',
  ACCOMPLISH: '完成',
}
const evaluationResultEnums = {
  REJECT: '拒绝',
  PASS: '通过'
}
const authEnums = {
  UNAUTHORIZED: '未授权',
  PART_OF: '部分授权',
  // FAIL: '授权失败',
  AUTHORIZED: '已授权'
}
const riskLevelEnums = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}
const evaluationMode = getSelectOption(evaluationModeEnums)
const evaluationStatus = getSelectOption(evaluationStatusEnums)
const evaluationResult = getSelectOption(evaluationResultEnums)
const authorizationStatus = getSelectOption(authEnums)
const riskLevel = getSelectOption(riskLevelEnums)

export const cFormData = {
  customerName: undefined,
  evaluationMode: undefined,
  evaluateStatusList: undefined,
  evaluateResult: undefined,
  authorizationStatus: undefined,
  riskLevel: undefined,
  memberName: undefined,
  time: undefined,
  initEndTime: undefined,
  initStarTime: undefined,
}
export const getFormConfig = ({
  getCustomerOptions
}) => [
  {
    type: 'select',
    key: 'uniformCreditCode',
    label: '客户名称',
    clearable: true,
    filterable: true,
    remote: true,
    remoteMethod: getCustomerOptions,
    options: [],
    otherKeys: {
      label: 'corporationName',
      value: 'uniformCreditCode'
    }
  },
  {
    type: 'select',
    key: 'evaluateMode',
    label: '评估模式',
    clearable: true,
    options: evaluationMode
  },
  {
    type: 'select',
    key: 'evaluateStatusList',
    label: '评估状态',
    clearable: true,
    options: evaluationStatus,
    multiple: true
  },
  {
    type: 'select',
    key: 'evaluateResult',
    label: '评估结果',
    clearable: true,
    options: evaluationResult
  },
  {
    type: 'select',
    key: 'authorizationStatus',
    label: '信息授权状态',
    clearable: true,
    options: authorizationStatus
  },
  {
    type: 'select',
    key: 'riskLevel',
    label: '风险评级',
    clearable: true,
    options: riskLevel
  },
  {
    type: 'input',
    key: 'memberName',
    label: '发起人',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    label: '发起时间',
    clearable: true,
    kind: 'daterange'
  },
]

export const collectionColumns = [
  { label: '任务编号', key: 'id', fixed: 'left', minWidth: 150 },
  { label: '客户名称', key: 'customerName', minWidth: 150, fixed: 'left' },
  { label: '信息授权状态', key: 'authorizationStatus', minWidth: 120, render: (row, item) => { return authEnums[item] || '- -' } },
  { label: '评估模式', key: 'evaluateMode', render: (row, item) => { return evaluationModeEnums[item] || '- -' } },
  { label: '评估状态', key: 'evaluateStatus', render: (row, item) => { return evaluationStatusEnums[item] || '- -' } },
  // { label: '备注', key: 'remark' },
  { label: '评估结果', key: 'evaluateResult', render: (row, item) => { return evaluationResultEnums[item] || '- -' } },
  { label: '风险评级', key: 'riskLevel', render: (row, item) => { return riskLevelEnums[item] || '- -' } },
  { label: '额度建议', key: 'quotaProportion', render: (reow, item) => { return item ? `年采购额的${item}%` : '- -' }, minWidth: 120 },
  { label: '发起人', key: 'createdName' },
  { label: '发起时间', key: 'createdTime', render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -', minWidth: 150 },
  { label: '评估完成时间', key: 'finishedTime', render: (row, item) => item ? moment(item).format('YYYY-MM-DD') : '- -', minWidth: 120 },
  { label: '评估结果有效期', key: 'expireTime', render: (row, item) => item ? moment(item).format('YYYY-MM-DD') : '- -', minWidth: 120 },
  { label: '操作', key: 'operate', slotName: 'operate', width: 150, fixed: 'right' },
]
