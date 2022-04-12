const getRepayApis = (instanceQuiet) => {
  return {
    // 获取还款列表
    getCreditRepayList: params => instanceQuiet.get('/saas-credit/v1/credit/creditdelivery/list', { params }),
    // 批量退货
    backCreateBatch: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditdeliverycancel/createBatch', data),
    // 还款详情整体信息
    getCreditRepayDetail: params => instanceQuiet.get('/saas-credit/v1/credit/creditdelivery/get', { params }),
    // ..
    getCreditrepaymentplan: params => instanceQuiet.get('/saas-credit/v1/credit/creditrepaymentplanitem/list', { params }),
    // 获取还款授信类型
    getRepayTypeList: params => instanceQuiet.get('/saas-credit/v1/credireditbillitem/listItemsByBillNo', { params }),
    // 还款周期修改
    setDebtPeriodDaysApply: data => instanceQuiet.post('/saas-credit/v1/credit/creditdelivery/setDebtPeriodDaysApply', data),
    // 根据多条件查询订单详情
    getDetailByCondition: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditorder/getDetailByCondition', { params }),
    // 创建还款单
    createPayMent: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditdelivery/create', data),
    // 根据订单编号查询还款周期天数
    getConfigPeriodDays: (params) => instanceQuiet.get('/saas-credit/v1/credit/ruleCheck/getConfigPeriodDays', { params }),
  }
}

export default getRepayApis
