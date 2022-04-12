const getReceiveInfoApis = (instanceQuiet) => {
  return {
    // 收款总额
    getRepaymentStatixDataByTime: params => instanceQuiet.get('/saas-arm/org/saArmRepaymentItem/getRepaymentStatixDataByTime', { params }),
    // 收款信息查询
    getReceiptsPaymentAllDataList: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceiptsPaymentAllDataList', data),
    // 还款明细详情
    getReceiveDetail: params => instanceQuiet.get('/saas-arm/org/saArmRepaymentItem/get', { params }),
    // 历史收款情况
    getSaArmRepaymentStatisticsList: params => instanceQuiet.get('/saas-arm/org/saArmRepaymentItem/getSaArmRepaymentStatisticsList', { params }),
  }
}

export default getReceiveInfoApis
