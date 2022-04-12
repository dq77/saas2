/* eslint-disable */
export const status = {
  '20210810204745499': '应收提醒通知',
  '20210810204745498': '应收超期通知',
  '20210810204745497': '应收完成提醒',
  '20210810204745500': '评估客户风险提醒',
  '20220315143909171': '开发商预警',
}

export const remindTodayColumns = [
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '收款对象', key: 'customerName' },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划收款时间', key: 'planEndDate' },
  { label: '计划应收金额', key: 'receivableAmount' },
  { label: '剩余未收回金额', key: 'outstandingAmount' }
]
export const remindRecentColumns = [
  { label: '应收剩余天数', key: 'days' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '收款对象', key: 'customerName' },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划收款时间', key: 'planEndDate' },
  { label: '计划应收金额', key: 'receivableAmount' },
  { label: '剩余未收回金额', key: 'outstandingAmount' }
]
export const overdueColumns = [
  { label: '超期天数', key: 'exceedDays' },
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '收款对象', key: 'customerName' },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划收款时间', key: 'planEndDate' },
  { label: '计划应收金额', key: 'receivableAmount' },
  { label: '剩余未收回金额', key: 'outstandingAmount' }
]
export const finishColumns = [
  { label: '应收名称', key: 'receivablePlanName' },
  { label: '收款对象', key: 'customerName' },
  { label: '款项类型', key: 'fundTypeName' },
  { label: '计划收款时间', key: 'planEndDate' },
  { label: '计划应收金额', key: 'receivableAmount' },
  { label: '收款时间', key: 'repaymentTime' },
  { label: '收款金额', key: 'repaymentAmount' },
  { label: '剩余未收回金额', key: 'outstandingAmount' }
]
// 风险专家-评估客户风险提醒
export const evaluateCustomerRiskColumns = [
  { label: '时间', key: 'eventHitTime', width: '150px' },
  { label: '风险类型', key: 'riskName' },
  { label: '风险描述', key: 'riskSubClassName' },
]
// 风险专家-开发商预警：每周重点公告
export const weeklyHighlightsColumns = [
  { label: '公告内容', key: 'content' },
]
// 风险专家-开发商预警：预警信息摘要
export const warningInfoColumns = [
  { label: '开发商名称', key: 'developerName' },
  { label: '预警信息摘要', key: 'content' },
]
// 风险专家-开发商预警：债券到期信息
export const maturityBondsColumns = [
  { label: '发行人', key: 'issuer' },
  { label: '债券余额(亿美元)', key: 'issuanceScale' },
]
// 风险专家-开发商预警：黑名单信息
export const blacklistColumns = [
  { label: '开发商名称', key: 'developerName' },
  { label: '三道红线全踩', key: 'threeRedLine' },
  { label: '已暴雷', key: 'collapse' },
  { label: '存在风险', key: 'risk' },
  { label: '风险观察名单', key: 'riskObserve' },
]
