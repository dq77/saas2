import { receivableBusinessType, receivableInvoiceType } from '@/utils/enumsSaas'
import { toAmountStr } from '@/utils/util'

// 业务类型
export const renderBusinessType = (row, key) => receivableBusinessType[row.accountType]
// 单据类型
export const renderInvoiceType = (row, key) => receivableInvoiceType[row.accountCode]
// 应收 应收金额
export const renderShouldInCome = (row, key) => {
  if (row.accountType === 1) return toAmountStr(row.actAmount, 2, true) // 发货
  else if (row.accountType === 3) return toAmountStr(-row.actAmount, 2, true) // 退货
  else return '- -'
}
// 实收 收款金额
export const renderActualInCome = (row, key) => {
  if (row.accountType === 2) return toAmountStr(row.actAmount, 2, true) // 收款
  else if (row.accountType === 4) return toAmountStr(-row.actAmount, 2, true) // 退款
  else return '- -'
}
