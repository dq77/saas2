const getOperateApis = (instanceQuiet) => {
  return {
    // 还款列表
    getRepaymentList: params => instanceQuiet.get('/saas-credit/v1/credit/creditrepaymentplan/getRepaymentList', { params }),
    // 还款账户总额
    getAccBalance: params => instanceQuiet.get('/saas-credit/v1/credit/creditrepaymentplan/getAccBalance', { params }),
    // 判断是否存在还款用户
    getRefundAccountConfig: (params) => instanceQuiet.get('/saas-credit/v1/credit/config/getRefundAccountConfig', { params }),
    // 还款
    doQjdRefund: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditpayment/doQjdRefund', data),
    // 没有账户时提交还款
    repaymentProcessInitiate: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditpayment/repaymentProcessInitiate', data),
    // 经销商名称查询
    getCustomerByRequest: data => instanceQuiet.post('/saas-boss/customer/getCustomerByRequest', data),
  }
}

export default getOperateApis
