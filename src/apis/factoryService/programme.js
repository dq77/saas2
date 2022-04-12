// 开发商评估
const getApis = (instanceQuiet) => {
  return {
    // 保存、提交项目
    projectSave: (data) => instanceQuiet.post('/partner/evaluation/project/save', data),
    // 编辑项目
    projectEdit: (data) => instanceQuiet.post('/partner/evaluation/project/edit', data),
    // 取消项目评估
    cancelProgramme: (data) => instanceQuiet.post('/partner/evaluation/project/cancel', data),
    // 获取关联公司列表
    getRelatedCompanyList: (params) => instanceQuiet.get('/partner/evaluation/project/relatedCompany', { params }),
    // 获取项目评估概览
    getEvaluationStatistics: (params) => instanceQuiet.get('/partner/evaluation/project/evaluationStatistics', { params }),
    // 通过id获取项目信息-本方
    getProjectDetail: (params) => instanceQuiet.get('/partner/evaluation/project/getEvaluationProjectById', { params }),
    // 通过id获取项目信息-第三方
    getProjectById: (params) => instanceQuiet.get('/partner/evaluation/project/getProjectById', { params }),
    // 获取项目评估列表（人工、基本）
    getProgrammeList: (data) => instanceQuiet.post('/partner/evaluation/project/list', data),
    // 获取项目列表-第三方
    getBaseProgrammeList: (data) => instanceQuiet.post('/partner/evaluation/project/search', data),
    // 获取关联公司风险概况
    getRelationRiskSummary: (params) => instanceQuiet.get('/partner/evaluation/project/riskRelationStatistics', { params }),
    // 获取股权质押概览
    getStockPledgeSummary: (params) => instanceQuiet.get('/partner/evaluation/project/stockPledgeNum', { params }),
    // 获取股东信息
    getShareholder: (params) => instanceQuiet.get('/partner/v2/evaluation/project/companyStockRights', { params }),
    // 获取股权穿刺图信息
    getRelationMap: (params) => instanceQuiet.get('/partner/v2/evaluation/project/companyMap', { params }),
  }
}

export default getApis
