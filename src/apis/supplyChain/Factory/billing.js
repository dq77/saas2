const billingApis = (instanceQuiet) => {
  return {// 开票流程相关接口
    // 查询开票的列表
    getBillingList: params => instanceQuiet.get('/saas-ofc/org/invoice/pageList', { params }),
    // 获取发票详情
    getBillingDetail: params => instanceQuiet.get('/saas-ofc/org/invoice/findDetailById', { params }),
    // 获取物流公司列表
    // getLogisticsListEnum: params => instanceQuiet.get('/saas-boss/v1/boss/dict/getList', { params }),
    // 编辑开票信息
    editBillingInfo: data => instanceQuiet.post('/saas-ofc/org/invoice/invoiceCreate', data),
    // 发票开票申请关闭
    closeBilling: data => instanceQuiet.post('/saas-ofc/org/invoice/closed', data),
    // 发票开票申请确认
    confirmBilling: data => instanceQuiet.post('/saas-ofc/org/invoice/confirm', data),
  }
}

export default billingApis
