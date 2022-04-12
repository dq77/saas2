const getHomeApis = (instanceQuiet) => {
  return {
    getIsGuideLineStep: params => instanceQuiet.get('/saas-boss/guideline/getIsGuideLineStepDetailList', { params }),
    // 查询租户开通的应用
    getTenantModuleList: params => instanceQuiet.get('/saas-boss/tenantApplicationRequest/getTenantModuleList', { params }),
    // 查询公司申请开通应用列表
    getApplicationRequest: params => instanceQuiet.get('/saas-boss/tenantApplicationRequest/getApplicationRequestByCompanyName', { params }),
  }
}

export default getHomeApis
