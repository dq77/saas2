const getPayInfoApis = (instanceQuiet) => {
  return {
    // 款项信息查询列表
    getReceivablePaymentAllDataList: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceivablePaymentAllDataList', data),
  }
}

export default getPayInfoApis
