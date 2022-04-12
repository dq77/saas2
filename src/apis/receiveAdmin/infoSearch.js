const getInfoSearchApis = (instanceQuiet) => {
  return {
    // 计划列表
    getPlainLIst: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/pageInfo', data),
    // 应收总状态
    getStatus: params => instanceQuiet.get('/saas-arm/org/saArmStatusCondition/list', { params }),
    // 查询项目名称下拉数据
    getProject: params => instanceQuiet.get('/saas-arm/org/saArmReceivableProjectRel/list', { params }),
    // 根据项目查询详情信息
    getprojectDetail: params => instanceQuiet.get('/saas-arm/org/saArmReceivableProjectRel/get', { params }),
    // 获取组织下的客户列表
    getCustomerList: data => instanceQuiet.post('/saas-boss/customer/getCustomerByPersonForSaaS', data),
    // 数据导出
    uploadDataSource: data => instanceQuiet.post('/saas-boss/boss/dataExport/create', data),
  }
}

export default getInfoSearchApis
