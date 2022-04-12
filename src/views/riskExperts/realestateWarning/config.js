import { toDateStr } from '@/utils/util'
import {percent2} from '@/utils/qjd'
import store from '@/store'
const { state: { permissions } } = store
const getTabs = () => {
  const options = []
  permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:DIGEST'] && options.push(
    {
      name: 'warningDigest',
      label: '预警信息摘要'
    }
  )
  permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:BOND'] && options.push(
    {
      name: 'warningBond',
      label: '债券到期信息'
    }
  )
  permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:NOTICE'] && options.push(
    {
      name: 'warningNotice',
      label: '历史公告信息'
    }
  )
  permissions['PTN:RISKEXPERTS:DEVELOPERWARNING:BLACKLIST'] && options.push(
    {
      name: 'blacklist',
      label: '黑名单信息'
    }
  )
  return options
}
export const realestateWarningTabs = getTabs()

// 预警信息摘要
export const riskformData = {
  developerName: undefined,
  createTimeStart: undefined,
  createTimeEnd: undefined,
}
export const riskformConfig = [
  {
    type: 'input',
    key: 'developerName',
    label: '开发商名称',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '日期'
  },
]
export const riskColumns = [
  { label: '时间', key: 'createTime', width: 200, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '客户名称', key: 'developerName', width: 200, },
  { label: '预警信息摘要', key: 'content', },
]

// 债卷到期信息
export const debtformData = {
  issuer: undefined,
  issuanceDeadlineStart: undefined,
  issuanceDeadlineEnd: undefined,
}
export const debtformConfig = [
  {
    type: 'input',
    key: 'issuer',
    label: '发行人',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '到期日期'
  },
]
export const debtColumns = [
  { label: '到期日期', key: 'issuanceDeadline', width: 200, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -'},
  { label: '发行人', key: 'issuer', },
  { label: '债券余额（亿美元）', key: 'issuanceScale', align: 'right', render: (row, item) => item ? percent2(item) : '- -' },
]

// 历史公告信息
export const historyformData = {
  content: undefined,
  createTimeStart: undefined,
  createTimeEnd: undefined,
}
export const historyformConfig = [
  {
    type: 'input',
    key: 'content',
    label: '公告内容',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '公告日期'
  },
]
export const historyColumns = [
  { label: '公告日期', key: 'createTime', width: 200, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '公告内容', key: 'content', },
]

// 黑名单信息
export const blackformData = {
  developerName: undefined,
  createTimeStart: undefined,
  createTimeEnd: undefined,
}
export const blackformConfig = [
  {
    type: 'input',
    key: 'developerName',
    label: '开发商名称',
    clearable: true
  },
  {
    type: 'datePicker',
    key: 'time',
    clearable: true,
    kind: 'daterange',
    label: '日期'
  },
]
export const blackColumns = [
  { label: '开发商名称', key: 'developerName', width: 200, },
  { label: '日期', key: 'createTime', width: 200, render: (row, item) => toDateStr(item, 'yyyy-MM-dd') || '- -' },
  { label: '三道红线全踩', key: 'threeRedLine', },
  { label: '已暴雷', key: 'collapse', },
  { label: '存在风险', key: 'risk', },
  { label: '风险观察名单', key: 'riskObserve', },
]
