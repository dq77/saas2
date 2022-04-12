import { deepCopy } from '@/utils/qjd'

export const columns = [
  { label: '客户标签', key: 'customerLevelCode', customHeader: 'customerLevelCodeHeader' },
  { label: '配置营销策略', key: 'creditResponseList'},
  { label: '操作', key: 'operate', width: 200 },
]

export const configSample = { customId: '' }

export const dataSample = { customerLevelCode: '', creditResponseList: [deepCopy(configSample)], customType: 'edit', loading: false, delRuleIdList: [] }

export const defaultLevel = {dictCode: 'DEFAULT_CUSTOMER_VIP_LEVEL', dictName: '无标签客户'}
