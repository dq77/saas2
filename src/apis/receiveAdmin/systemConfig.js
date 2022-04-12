const getSystemConfigApis = (instanceQuiet) => {
  return {
    // 列表（应收款项配置、支付方式配置、收款状态配置）
    configGetMenuList: data => instanceQuiet.post('/saas-arm/org/systemConfiguration/getMenuList', data),
    // 删除（应收款项配置、支付方式配置、收款状态配置）
    configDeleteDict: params => instanceQuiet.get('/saas-arm/org/systemConfiguration/deleteDict', { params }),
    // 保存（应收款项配置、支付方式配置）
    configGetMenuUpdate: data => instanceQuiet.post('/saas-arm/org/systemConfiguration/getMenuUpdate', data),
    /** 收款状态配置 */
    // 列表
    configStatusList: params => instanceQuiet.get('/saas-arm/org/saArmStatusCondition/list', { params }),
    // 创建
    configStatusCreate: data => instanceQuiet.post('/saas-arm/org/saArmStatusCondition/create', data),
    // 编辑
    configStatusUpdate: data => instanceQuiet.post('/saas-arm/org/saArmStatusCondition/updateById', data),
    // 删除
    configStatusDelete: data => instanceQuiet.post('/saas-arm/org/saArmStatusCondition/deleteById', data),
    /** 应收方案配置 */
    // 列表
    configGetPlanList: params => instanceQuiet.get('/saas-arm/org/saArmReceivableSolution/list', { params }),
    // 创建
    configPlanCreate: data => instanceQuiet.post('/saas-arm/org/saArmReceivableSolution/create', data),
    // 编辑
    configPlanUpdate: data => instanceQuiet.post('/saas-arm/org/saArmReceivableSolution/updateById', data),
    // 删除
    configPlanDelete: data => instanceQuiet.post('/saas-arm/org/saArmReceivableSolution/deleteById', data),
  }
}

export default getSystemConfigApis
