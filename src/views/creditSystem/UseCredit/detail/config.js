import { toAmountStr } from '@/utils/util'

export const columns = [
  { label: '授信类型', key: 'creditTypeName' },
  { label: '额度来源', key: 'organizationName' },
  { label: '项目名称', key: 'projectName' },
  { label: '合同编号', key: 'contractCode' },
  { label: '合同名称', key: 'contractName' },
  { label: '使用额度', key: 'amountUse', align: 'right' }
]
// 详情配置
export const detailColumns = [
  { label: '订单编号：', key: 'extOrderCode' },
  { label: '订单金额：', key: 'orderAmount', render: (data, item) => item ? toAmountStr(item, undefined, true) : '- -' },
  { label: '用信编号：', key: 'billNo' },
  { label: '用信金额：', key: 'creditAmount' },
  { label: '经销商名称：', key: 'customerName' },
  { label: '项目名称：', key: 'projectName' },
  { label: '客户编号：', key: 'extCustomerCode' },
  { label: '项目编号：', key: 'extProjectCode' },
  { label: '用信时间：', key: 'createdTime' },
  { label: '业务类型名称：', key: 'businessTypeName' },
]
