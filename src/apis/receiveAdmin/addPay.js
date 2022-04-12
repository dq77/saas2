const getAddPayApis = (instanceQuiet) => {
  return {
    // 获取款项类型和付款方式
    getPayInfo: data => instanceQuiet.post('/saas-arm/org/systemConfiguration/getMenuList', data),
    // 获取应收方案下拉列表
    getReceiveList: params => instanceQuiet.get('/saas-arm/org/saArmReceivableSolution/list', { params }),
    // 获取款项详情 & 调整计划 - 获取款项列表
    getPayList: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/list', { params }),
    // 添加款项
    createPay: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlanItem/create', data),
    // 编辑款项
    updatePay: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlanItem/updateById', data),
    // 删除款项
    deletePay: data => instanceQuiet.post('/saas-arm/org/saArmReceivablePlanItem/deleteById', data),
    // 获取款项详情
    getPayDetail: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlanItem/get', { params }),
    // 调整计划
    ajustPlain: data => instanceQuiet.post('/saas-arm/org/saArmAdjust/create', data),
    // 调整记录
    getRecord: params => instanceQuiet.get('/saas-arm/org/saArmAdjust/list', { params }),
    // 添加收款
    addReceive: data => instanceQuiet.post('/saas-arm/org/saArmRepaymentItem/create', data),
    // 收款记录
    getPayRecord: params => instanceQuiet.get('/saas-arm/org/saArmRepaymentItem/list', { params }),
    // 获取金额详细数据
    getMoneyDetail: params => instanceQuiet.get('/saas-arm/org/saArmReceivablePlan/getInfoById', { params }),
  }
}

export default getAddPayApis
