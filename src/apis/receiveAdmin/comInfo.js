const getComInfoApis = (instanceQuiet) => {
  return {
    // 企业应收查询
    getComLists: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceivableCustomerDataView', data),
    // 应收计划信息查询
    getReceivablePlanDataView: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceivablePlanDataView', data),
    // 应收款项信息查询
    getReceivablePaymentDataView: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceivablePaymentDataView', data),
    // 收款信息查询
    getReceiptsPaymentDataView: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getReceiptsPaymentDataView', data),
    // 预期信息查询
    getOverdueDataView: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/getOverdueDataView', data),
    // 应收画像
    getCustomerImageDataView: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getCustomerImageDataView', { params }),
    // 附件列表
    getFileLists: params => instanceQuiet.get('/saas-arm/org/saArmBusinessFile/list', { params }),
  }
}

export default getComInfoApis
