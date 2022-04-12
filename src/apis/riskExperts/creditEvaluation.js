const getApis = (instanceQuiet) => {
  return {
    getRiskBasic: (params) => instanceQuiet.get('/partner/risk/basic', { params }),
    // 获取授权列表
    getAccreditList: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/accredit/detail', { params }),
    // 授信提交
    updateNoAuthById: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/updateNoAuthById', data),
    createEvaluateOnAuth: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/accredit/createEvaluateOnAuth', { params }),
    // 获取赊销评估列表
    getCreditTaskList: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/page', data),
    // 获取上传资料信息（精准）
    getUploadInfo: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/accredit/fillInfoDetail', { params }),
    // 精准评估发起
    accurateCreate: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/accurateCreate', data),
    // 标准评估发起
    standardCreate: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/standardCreate', data),
    // 标准评估暂存
    saveStandardTemporary: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/saveStandardTemporary', data),
    // 发起快速评估
    fastCreate: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/creditevaluation/fastCreate', data),
    // 标准发起评估
    startStandardEvaluation: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/creditevaluation/startStandardEvaluation', { params }),
    // 上传资料（精准）
    uploadInfo: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/accredit/createEvaluate', data),
    // 授权发送短信
    sendAuthSms: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/accredit/sendAuthSms', data),
    // 评估资料查看
    getApplicationInfoById: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/creditevaluation/getApplicationInfoById', {params}),
    // 暂存上传资料（精准）
    stagingUploadInfo: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/accredit/stagingDetail', data),
    // 评估结果
    getResultById: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/creditevaluation/getResultById', {params}),
    // 客户模糊查询
    getCustomerList: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/creditevaluation/listCustomer', {params}),
    // 取消项目评估
    cancelProjectEvaluation: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/cancel', {params}),
  }
}

export default getApis
