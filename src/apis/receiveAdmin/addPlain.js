const getAddPlainApis = (instanceQuiet) => {
  return {
    // 添加计划
    createPlain: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/create', data),
    // 修改计划
    updatePlain: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlan/updateById', data),
    // 获取计划详情
    getPlainDetail: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/get', { params }),
    // 添加收款对象
    createReceiveUser: data => instanceQuiet.post('/saas-boss/customer/createCustomerAndService', data),
    // 批量下载计划下载模板
    downPlain: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/getTemplate', { params }),
  }
}

export default getAddPlainApis
