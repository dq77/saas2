export const columns = [
  { label: '营销策略名称', key: 'productName' },
  { label: '还款周期(天)', key: 'periodDays'},
  { label: '首付款比例', key: 'downPaymentRatio' },
  { label: '操作', key: 'operate', width: 200 },
]

export const dataSample = { productName: '', periodDays: 0, downPaymentRatio: 0, customType: 'edit' }

// 默认还款周期入参
export const params = { configKey: 'DEFAULT_REPAYMENT_PERIOD' }
// 默认还款首付款比例
export const preParams = { configKey: 'DEFAULT_DOWN_PAYMENT_RATIO' }
