// tab
export const tabs = [
  {
    name: 'receivable',
    label: '应收款项配置'
  },
  {
    name: 'payment',
    label: '支付方式配置'
  },
  {
    name: 'status',
    label: '收款状态配置'
  },
  {
    name: 'plan',
    label: '应收方案配置'
  }
]
// 应收款项
export const ACCOUNTS = 'arm_receivable_accounts'
// 支付方式
export const PAYMENT = 'arm_receivable_payment_type'
// 收款状态
export const STATUS = 'arm_receivable_payment_status'
// 默认配置、自定义配置枚举
export const dictType = {
  1: '系统内置',
  2: '自定义'
}
