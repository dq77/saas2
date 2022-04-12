const getApis = (instanceQuiet) => {
  return {
    getRiskBasic: data => instanceQuiet.post('/riskmanagement/riskDetail/page', data),
    getweek: (params) => instanceQuiet.get('/partner/enterprise/portal/data/company/list', { params }),
    // 赊销评估列表
    getCreditEvaluation: data => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/relastevaluation/page', data),
    // 项目评估列表
    getProjectEvaluation: data => instanceQuiet.post('/riskmanagement/projectEvaluation/page', data),
    // 模糊搜索-获取赊销客户名称
    getListCustomer: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/relastevaluation/listCustomer', { params }),
    getNameList: data => instanceQuiet.post('/riskmanagement/projectEvaluation/nameList', data),
    // 关注
    riskexpertFoucus: data => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/reuserattention/foucus', data),
    // 取消关注
    riskexpertCancelFoucus: data => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/reuserattention/cancelFoucus', data),
    // 获取数量
    getCount: (params) => instanceQuiet.get('/riskmanagement/warn/getCount', { params }),
  }
}

export default getApis
