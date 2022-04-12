const getHomeApis = (instanceQuiet) => {
  return {
    // 常用服务
    getCommonServiceList: () => instanceQuiet.get('/saas-boss/memberservice/getCommons'),
    getAllServiceList: () => instanceQuiet.get('/saas-boss/memberservice/get'),
    updateCommonService: data => instanceQuiet.post('/saas-boss/memberservice/update', data),
    businessViewSummary: params => instanceQuiet.get('/partner/business/view/summary', { params }),
    businessViewStatistics: params => instanceQuiet.get('/partner/business/view/statistics', { params }),
    getIsGuideLineStep: params => instanceQuiet.get('/saas-boss/guideline/getIsGuideLineStepDetailList', { params }),
    getRiskTotalInfo: params => instanceQuiet.get('/partner/risk/view', { params }),
  }
}

export default getHomeApis
