import { logLevel } from '@/consts'

export const sysColumns = [
  { label: '记录时间', key: 'requestTime' },
  { label: '功能模块', key: 'methodFunction' },
  { label: '日志级别', key: 'logLevel', render: (row, val) => logLevel[val] },
  { label: '错误信息', key: 'exceptionMessage' },
]

export const sysFormConfig = [
  { type: 'select', key: 'methodFunction', label: '功能模块', filterable: true, options: [], otherKeys: { label: 'methodFunction', value: 'methodFunction' } },
  { type: 'select', key: 'logLevel', label: '日志级别', options: Object.keys(logLevel).map(key => ({ label: logLevel[key], value: key })) },
]

export const errColumns = [
  { label: '记录时间', key: 'createdTime' },
  { label: '对应模块', key: 'moduleCnName' },
  { label: '错误场景', key: 'businessCase' },
  { label: '错误内容', key: 'errorInfo' },
  { label: '处理状态', key: 'processedFlagName' },
  {
    label: '操作',
    key: 'operate',
    options: [
      { label: '处理', render: (row) => row.processedFlag === 0 ? '处理' : row.processedFlag === 1 ? '查看' : '' }
    ]
  },
]

export const modalColumns = [
  { label: '订单编号', key: 'extOrderCode' },
  { label: '发货编号', key: 'extDeliveryCode' },
  { label: '最后还款时间', key: 'debtEndTime' },
  { label: '本次还款金额(元)', key: 'amount' },
]
