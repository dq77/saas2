const getApis = (instanceQuiet) => {
  return {
    getProjectTaskList: (data) => instanceQuiet.post('/riskmanagement/projectEvaluation/page', data),
    fastProjectCreate: (data) => instanceQuiet.post('/riskmanagement/projectEvaluation/save', data),
    deepProjectCreate: (data) => instanceQuiet.post('/riskmanagement/projectEvaluation/saveDeep', data),
    getCustomerList: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/creditevaluation/listCustomer', {params}),
    // 深度评估结果
    getDeepByProcessId: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/deepByProcessId', {params}),
    tycCompanyBase: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/tycCompanyBase', {params}),
    getDeepEvaluationById: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/getDeepEvaluationById', {params})
  }
}

export default getApis
