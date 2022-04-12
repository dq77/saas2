const getQuotaApis = (instanceQuiet) => {
  return {
    // 额度来源
    getSalesAreaAccountList: params => instanceQuiet.get('/saas-credit/v1/credit/creditaccount/getSalesAreaAccountList', { params }),
    // 根据项目外部编号获取项目合同列表
    getProByCode: params => instanceQuiet.get('/saas-boss/v1/boss/orgprojectcontract/getList', { params }),
    // 获取直签额度客户
    getCreditCustomerList: params => instanceQuiet.get('/saas-credit/v1/credit/creditaccount/getCreditCustomerList', { params }),
    // 使用额度客户
    getCreditSalesAreaList: params => instanceQuiet.get('/saas-credit/v1/credit/creditaccount/getCreditSalesAreaList', { params }),
    // 获取授信详情
    getCreditDetail: params => instanceQuiet.get('/saas-credit/v1/credit/creditapply/get', { params }),
    // 创建授信账户
    creditCreate: data => instanceQuiet.post('/saas-credit/v1/credit/creditapply/create', data),
    // 重新发起授信申请
    reCreditApply: params => instanceQuiet.get('/saas-credit/v1/credit/creditapply/reCreditApply', { params }),
    // 更新授信申请状态
    updateCreditApplyStatus: params => instanceQuiet.get(`/saas-credit/v1/credit/creditapply/updateCreditApplyStatus/${params.id}/${params.creditStatus}`, { params }),
    // 授信申请列表
    getCreditAccountList: params => instanceQuiet.get('/saas-credit/v1/credit/creditapply/list', { params }),
    // 根据应用场景获取场景下需要材料
    getMaterialByScenario: params => instanceQuiet.get('/saas-credit/v1/credit/creditapprovalmaterialsconfig/getMaterialByScenario', { params }),
    // 更具客户查询产品策略
    getRuleConfigsByCustomerId: params => instanceQuiet.get('/saas-credit/v1/credit/ruleCheck/getRuleConfigsByCustomerId', { params }),
    // 变更授信
    changeCreditApply: data => instanceQuiet.post('/saas-credit/v1/credit/creditaccount/changeCreditApply', data),
    // 失效授信
    invalidCreditApply: data => instanceQuiet.post('/saas-credit/v1/credit/creditaccount/invalidCreditApply', data),
  }
}

export default getQuotaApis
