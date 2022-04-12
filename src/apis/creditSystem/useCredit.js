const getUseCreditApis = (instanceQuiet) => {
  return {
    // 用信管理列表
    getCreditManageList: params => instanceQuiet.get('/saas-credit/v1/credit/creditorder/list', { params }),
    // 批量关单
    createBatch: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditorderclose/createBatch', data),
    // 获取用信或还款订单
    getUpload: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditauditlog/page', { params }),
    // /saas-credit/v1/credit/import/page
    getImportList: (params) => instanceQuiet.get('/saas-credit/v1/credit/import/page', { params }),
    // 处理一下
    retryDone: (data) => instanceQuiet.post('/saas-credit/v1/credit/import/retry', data),
    // 获取用信详情
    getCreditorderDetail: params => instanceQuiet.get('/saas-credit/v1/credit/creditorder/get', { params }),
    // 查看额度
    getCreditLineList: params => instanceQuiet.get('/saas-credit/v1/credit/creditorder/getCreditLineList', { params }),
    // 业务类型
    getBusinessList: (params) => instanceQuiet.get('/saas-credit/v1/credit/businesstypeperiod/getList', { params }),
    // 创建用信
    createCredit: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditorder/create', data),
  }
}

export default getUseCreditApis
