// 风险工作台接口
const getApis = (instanceQuiet) => {
  return {
    // 我的任务:赊销
    getMyMissions: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getMyReCreditEvaluationSticInfo', { params }),
    // 我的任务:项目
    getMyMissionsOfProject: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/resultIngCount', { params }),
    // 风险预警
    getPagedRisk: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/reriskevent/getListByMemberPage', { params }),
    // 今日舆情
    getPagedNews: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/reriskopiniondistribution/page', { params }),
    // 今日舆情：点击条目，调用此接口把舆情设为已读
    setNewsRead: (data) => instanceQuiet.post('/saas-risk-expert/v1/riskexpert/reriskopiniondistribution/read', data),
    // 评估任务总览：赊销评估
    getCreditEvaluateTask: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getOverviewOfAssessmentTasks', { params }),
    // 评估任务总览：项目评估
    getProjectEvaluateTask: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/count', { params }),
    // 评估结果总览：topblock信息、客户风险评级分布
    getCreditEvaluateResult1: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getEvaluateResultSticInfo', { params }),
    // 评估结果总览：评估模式及评级结果
    getCreditEvaluateResult2: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getReCreditRiskLevelModeList', { params }),
    // 评估结果总览：项目评估：快速评估结果分布、深度评估结果分布
    getProjectEvaluateResult: (params) => instanceQuiet.get('/riskmanagement/projectEvaluation/resultCount', { params }),
    // 客户风险总览：topblock信息、风险类型分布
    getCustomerRiskCate: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getReRiskOverviewStic', { params }),
    // 客户风险总览：风险原因分布
    getCustomerRiskReason: (params) => instanceQuiet.get('/saas-risk-expert/v1/riskexpert/recreditevaluation/getReRiskResonStic', { params }),
  }
}

export default getApis
