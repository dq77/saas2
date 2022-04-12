export const collectionColumns = [
  { label: '经销商名称', key: 'customerName' },
  { label: '订单编号', key: 'extOrderCode' },
  { label: '发货编号', key: 'extDeliveryCode' },
  { label: '应收账款金额（元）', key: 'loanAmount', align: 'right', width: 140 },
  { label: '剩余应收账款金额[应收账款金额]（元）', key: 'debtAmount', align: 'right', width: 240 },
  { label: '最后还款时间', key: 'lastDebtDate' },
  { label: '业务员姓名', key: 'memberNameList', render: (scope, val) => val ? val.join(',') : '- -' },
]

export const distributorDetailColumns = [
  { label: '业务员姓名', key: 'memberNameList', render: (scope, val) => val ? val.join(',') : '- -' },
  { label: '负责的经销商名称', key: 'customerName' },
  { label: '总逾期额度（元）', key: 'debtAmount', align: 'right' },
]

export const loanDetailColumns = [
  { label: '业务员姓名', key: 'memberName' },
  { label: '组织名称', key: 'departmentIdTree' },
  { label: '负责的经销商名称', key: 'accountName' },
  { label: '使用经销商授信总额', key: 'dealerCreditSumAmount', align: 'right' },
  { label: '使用项目授信总额', key: 'projectCreditSumAmount', align: 'right' },
]
