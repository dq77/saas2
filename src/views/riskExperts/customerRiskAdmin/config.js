import {typeEnums, resultEnums, levelEnums, projectTypeEnums, projectResultEnums, projectStatusEnums, riskTypeEnums} from './consts'
import { toDateStr } from '@/utils/util'
import { percent2 } from '@/utils/qjd'
import store from '@/store'
const { state: { permissions } } = store
const getAssessmentTabs = () => {
  const options = []
  permissions['PTN:RISKEXPERTS:CREDITEVALUATION:CUSTOMER'] && options.push(
    {
      name: 'creditCustomerQuery',
      label: '赊销评估客户',
      value: 'credit',
    }
  )
  permissions['PTN:RISKEXPERTS:PROJECTEVALUATION:CUSTOMER'] && options.push(
    {
      name: 'projectCustomerQuery',
      label: '项目评估客户',
      value: 'project'
    }
  )
  return options
}
export const assessmentTabs = getAssessmentTabs()

export const creditformData = {
  corporationName: undefined,
  evaluateMode: undefined,
  evaluateResult: undefined,
  riskLevel: undefined,
}

export const creditformConfig = (remoteMethod) => {
  return [
    {
      type: 'select',
      key: 'corporationName',
      label: '客户名称',
      filterable: true,
      remote: true,
      otherKeys: { label: 'corporationName', value: 'corporationName' },
      remoteMethod,
      options: [],
      clearable: true
    },
    {
      type: 'select',
      key: 'evaluateMode',
      label: '最新评估模式',
      clearable: true,
      options: typeEnums
    },
    {
      type: 'select',
      key: 'evaluateResult',
      label: '最近评估结果',
      clearable: true,
      options: resultEnums
    },
    {
      type: 'select',
      key: 'riskLevel',
      label: '最近风险评级',
      clearable: true,
      options: levelEnums
    },
  ]
}

export const creditColumns = [
  { label: '客户名称', key: 'corporationName', minWidth: 200, fixed: 'left' },
  { label: '最近评估模式', key: 'evaluateMode', render: (row, item) => (typeEnums.find(type => type.value === item) || {}).label || '- -' },
  { label: '最近评估结果', key: 'evaluateResult', render: (row, item) => (resultEnums.find(type => type.value === item) || {}).label || '- -' },
  { label: '最近风险评级', key: 'riskLevel', render: (row, item) => (levelEnums.find(type => type.value === item) || {}).label || '- -' },
  { label: '最近额度建议', key: 'quotaProportion', render: (row, item) => '年采购额的' + item + '%' },
  { label: '评估结果有效期', key: 'expireTime', width: 150, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '关注', key: 'isNoticed', fixed: 'right' },
  { label: '操作', key: 'operate', width: 150, fixed: 'right' }
]
// 赊销评估客户-评估结果
export const baseInfoformConfig = [
  { type: 'input', key: 'name', label: '客户名称', span: 12, disabled: true },
  { type: 'input', key: 'corporationId', label: '统一社会信用代码', span: 12, disabled: true },
]
export const creditResultColumns = [
  { label: '任务编号', key: 'id', minWidth: 200 },
  { label: '评估模式', key: 'evaluateModeCn' },
  { label: '评估状态', key: 'evaluateStatusCn'},
  { label: '评估结果', key: 'evaluateResultCn'},
  { label: '风险评级', key: 'riskLevel', render: (row, item) => (levelEnums.find(type => type.value === item) || {}).label || '-'},
  { label: '额度建议', key: 'quotaProportion', render: (row, item) => row.evaluateStatus === 'ACCOMPLISH' ? '年采购额的' + item + '%' : '- -' },
  { label: '评估时间', key: 'finishedTime', minWidth: 120, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '评估结果有效期', key: 'expireTime', minWidth: 120, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '操作', key: 'operate', width: 150, },
]

// 赊销评估客户-舆情信息
export const creditNewsTabs = [
  { label: '风险事件', value: 'risk' },
  { label: '新闻舆情', value: 'news' }
]
// 赊销评估客户-舆情信息-风险事件
export const riskColumns = [
  { label: '时间', key: 'createdTime', width: 200, },
  { label: '风险类型', key: 'riskType', width: 200, render: (row, item) => riskTypeEnums[item]},
  { label: '风险描述', key: 'riskSubClassName', },
]
export const riskformData = {
  corporationName: undefined,
  queryStartDate: undefined,
  queryEndDate: undefined,
}
export const riskformConfig = [
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '时间'
  },
]
// 赊销评估客户-舆情信息-新闻舆情
export const newsformData = {
  corporationName: undefined,
  queryStartDate: undefined,
  queryEndDate: undefined,
}
export const newsformConfig = [
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '时间'
  },
]
export const newsColumns = [
  { label: '时间', key: 'publicOpinionTime', width: 200, },
  { label: '新闻标题', key: 'title'},
]

// 项目评估
export const projectformData = {
  name: undefined,
  type: undefined,
  result: undefined,
  resultTimeFrom: undefined,
  resultTimeTo: undefined,
}

export const projectformConfig = (remoteMethod) => {
  return [
    {
      type: 'select',
      key: 'name',
      label: '客户名称',
      filterable: true,
      remote: true,
      otherKeys: { label: 'corporationName', value: 'corporationName' },
      remoteMethod,
      options: [],
      clearable: true
    },
    {
      type: 'select',
      key: 'type',
      label: '最新评估模式',
      clearable: true,
      options: projectTypeEnums
    },
    {
      type: 'select',
      key: 'result',
      label: '最近评估结果',
      clearable: true,
      options: projectResultEnums
    },
    {
      type: 'datePicker',
      key: 'time',
      clearable: true,
      kind: 'daterange',
      label: '最近评估完成时间'
    },
  ]
}
export const projectColumns = [
  { label: '客户名称', key: 'name', minWidth: 200, fixed: 'left' },
  { label: '最近评估模式', key: 'type', render: (row, item) => (projectTypeEnums.find(type => type.value === item) || {}).label || '- -' },
  { label: '最近评估结果', key: 'result' },
  { label: '最近评估完成时间', key: 'resultTime', width: 150, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -'},
  { label: '关注', key: 'flag', fixed: 'right' },
  { label: '操作', key: 'operate', width: 150, fixed: 'right' }
]
// 项目评估-评估结果
export const projectResultColumns = [
  { label: '任务编号', key: 'taskNumber' },
  { label: '评估模式', key: 'type', render: (row, item) => (projectTypeEnums.find(type => type.value === item) || {}).label || '- -'},
  { label: '评估状态', key: 'status', render: (row, item) => (projectStatusEnums.find(type => type.value === item) || {}).label || '- -'},
  { label: '评估结果', key: 'result'},
  { label: '评估完成时间', key: 'resultTime', width: 150, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -', minWidth: 120 },
  { label: '操作', key: 'operate', width: 150, },
]
// 项目评估-预警信息
export const projectWarningTabs = [
  { label: '预警信息摘要', value: 'risk' },
  { label: '债劵到期信息', value: 'debt' },
  { label: '黑名单信息', value: 'black' },
]
export const projectRiskformData = {
  companyName: undefined,
  createTimeStart: undefined,
  createTimeEnd: undefined,
}
export const projectRiskformConfig = [
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '时间'
  },
]
export const projectRiskColumns = [
  { label: '时间', key: 'createTime', width: 200, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -'},
  { label: '预警信息摘要', key: 'content', },
]
// 债劵到期
export const debtformData = {
  issuer: undefined,
  issuanceDeadlineStart: undefined,
  issuanceDeadlineEnd: undefined,
}
export const debtformConfig = [
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '到期日期'
  },
]
export const debtColumns = [
  { label: '到期日期', key: 'issuanceDeadline', render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '债券余额（亿美元）', key: 'issuanceScale', render: (row, item) => item ? percent2(item) : '- -' },
]
// 黑名单
export const blackColumns = [
  { label: '日期', key: 'createTime', },
  { label: '三道红线全踩', key: 'threeRedLine', },
  { label: '已暴雷', key: 'collapse', },
  { label: '存在风险', key: 'risk', },
  { label: '风险观察名单', key: 'riskObserve', },
]
