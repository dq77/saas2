import store from '@/store'

const { state: { permissions } } = store
const getTabs = () => {
  const options = []
  permissions['PTN:RISKEXPERTS:PUBLICOPINION:RISKEVENT'] && options.push(
    {
      name: 'riskEvent',
      label: '风险事件'
    }
  )
  permissions['PTN:RISKEXPERTS:PUBLICOPINION:JOURNALISM'] && options.push(
    {
      name: 'journalism',
      label: '新闻舆情'
    }
  )
  return options
}

export const newsRemindTabs = getTabs()
// 风险类型
export const riskTypeEnums = [
  { label: '企业基本风险排查', value: 'RC_004' },
  { label: '企业经营风险排查', value: 'RC_005' },
  { label: '企业法诉排查', value: 'RC_006' },
  { label: '个人黑名单', value: 'RC_003' },
  { label: '个人法诉排查', value: 'RC_002' },
  { label: '多头反欺诈', value: 'RC_001' },
]

// 风险事件
export const riskformData = {
  corporationName: undefined,
  riskType: undefined,
  time: undefined,
}
export const riskformConfig = (remoteMethod) => {
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
      key: 'riskType',
      label: '风险类型',
      clearable: true,
      options: riskTypeEnums
    },
    {
      type: 'datePicker',
      key: 'time',
      clearable: true,
      kind: 'daterange',
      label: '时间'
    },
  ]
}
export const riskColumns = [
  { label: '客户名称', key: 'corporationName', },
  { label: '时间', key: 'createdTime', width: 200, },
  { label: '风险类型', key: 'riskType', width: 200, render: (row, item) => (riskTypeEnums.find(type => type.value === item) || {}).label || '- -' },
  { label: '风险描述', key: 'riskSubClassName'},
]
// 新闻舆情
export const newsformData = {
  corporationName: undefined,
  title: undefined,
  queryStartDate: undefined,
  queryEndDate: undefined,
}
export const newsformConfig = (remoteMethod) => {
  return [
    {
      type: 'select',
      key: 'corporationName',
      label: '客户名称',
      filterable: true,
      remote: true,
      otherKeys: { label: 'content', value: 'content' },
      remoteMethod,
      options: [],
      clearable: true
    },
    {
      type: 'input',
      key: 'title',
      label: '标题',
      clearable: true
    },
    {
      type: 'datePicker',
      key: 'time',
      clearable: true,
      kind: 'daterange',
      label: '时间'
    },
  ]
}
export const newsColumns = [
  { label: '时间', key: 'publicOpinionTime', width: 200, },
  { label: '新闻标题', key: 'title'},
]
