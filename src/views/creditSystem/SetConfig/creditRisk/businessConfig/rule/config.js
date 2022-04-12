export const columns = [
  { label: '限制条件', key: 'limitConditionName' },
  { label: '运算符', key: 'operator'},
  { label: '限制值', key: 'limitValue' },
  { label: '时间参数', key: 'timeParam' },
  { label: '规则状态', key: 'status' },
  { label: '操作', key: 'operate', width: 200 },
]

export const statusoptions = [
  { label: '生效', value: 1 },
  { label: '失效', value: 2 }
]

export const operatorOptions = [
  { label: '小于或等于', value: 'le' },
  { label: '小于', value: 'lt' },
]

export const timeParamOptions = [
  { label: '近7天', value: '7' },
  { label: '近30天', value: '30' },
  { label: '近90天', value: '90' },
  { label: '近180天', value: '180' },
  { label: '近360天', value: '360' },
]

export const titleInfo = {
  累计已授信金额: '统计授信状态为“已授信”的累计授信总额度',
  累计应还款金额: '统计还款状态为“待还款”和“部分还款”的累计总额度',
  累计已逾期金额: '统计逾期状态为“已逾期”的累计总额度',
  累计已授信客户数: '根据业务员统计授信状态为“已授信”的累计授信客户总数',
  累计已逾期次数: '统计逾期状态为“已逾期”的总次数(只统计当前逾期，不含历史逾期)',
  逾期比例: '累计已逾期金额 除以 累计已授信金额'
}
