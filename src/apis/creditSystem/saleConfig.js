const getSaleConfigApis = (instanceQuiet) => {
  return {
    // 销区列表带分页
    getSaleList: (params) => instanceQuiet.get('/saas-boss/v1/boss/salesarea/list', { params }),
    // 销区列表无分页
    getSaleAll: (params) => instanceQuiet.get('/saas-boss/v1/boss/salesarea/getList', { params }),
    // 添加销区
    addSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/create', data),
    // 修改销区
    changeSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/update', data),
    // 删除销区
    deleteSale: (data) => instanceQuiet.post('/saas-boss/v1/boss/salesarea/delete', data),
    // 获取授信配置账户信息
    getCreditAccountConfig: params => instanceQuiet.get('/saas-credit/v1/credit/creditaccount/getCreditAccountConfig', { params }),
    // 启用禁用
    changeStatus: params => instanceQuiet.get(`/saas-credit/v1/credit/creditaccount/updateCreditAcoountStatus/${params.id}/${params.creditStatus}`),
    // 创建授信账户
    creditAccountCreate: data => instanceQuiet.post('/saas-credit/v1/credit/creditaccount/create', data),
    // 更新授信账户
    creditAccountUpdate: data => instanceQuiet.post('/saas-credit/v1/credit/creditaccount/update', data),
    // 添加销售组织及授信额度
    createSalesAreaAccount: data => instanceQuiet.post('/saas-credit/v1/credit/creditaccount/createSalesAreaAccount', data),
    // ----------------- 赊销政策配置: 授信类型 ------------------------------------
    // 获取授信类型配置/获取产品策略默认配置
    getCreditTypes: (params) => instanceQuiet.get('/saas-credit/v1/credit/config/get', { params }),
    // 设置授信类型
    setCreditTypes: data => instanceQuiet.post('/saas-credit/v1/credit/config/createCreditType', data),
    // ----------------- 赊销政策配置: 授信类型 ------------------------------------

    // ----------------- 赊销规则配置 ------------------------------------
    // 获取产品策略配置(除默认数据)
    getCreditruleconfig: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditruleconfig/list', { params }),
    // 添加产品策略配置
    createCreditruleconfig: data => instanceQuiet.post('/saas-credit/v1/credit/creditruleconfig/create', data),
    // 更新产品策略配置
    updateCreditruleconfig: data => instanceQuiet.post('/saas-credit/v1/credit/creditruleconfig/update', data),
    // 更新赊销默认还款周期
    setDefaultCycle: (data) => instanceQuiet.post('/saas-credit/v1/credit/config/createDefaultRepaymentPeriod', data),
    // ----------------- 赊销规则配置 ------------------------------------

    // ----------------- 客户控制策略 ------------------------------------
    // 获取客户控制策略
    getCustomerlevelrulerel: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditcustomerlevelrulerel/list', { params }),
    // 创建客户控制策略
    createCustomerlevelrulerel: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditcustomerlevelrulerel/create', data),
    // 更新客户控制策略
    updateCustomerlevelrulerel: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditcustomerlevelrulerel/updateByCustomerLevelCode', data),
    // ----------------- 客户控制策略 ------------------------------------

    // ----------------- 业务类型策略 ------------------------------------
    // 获取业务类型策略
    getBusinesstypeperiod: (params) => instanceQuiet.get('/saas-credit/v1/credit/businesstypeperiod/getList', { params }),
    // 创建业务类型策略
    createBusinesstypeperiod: (data) => instanceQuiet.post('/saas-credit/v1/credit/businesstypeperiod/create', data),
    // 更新业务类型策略
    updateBusinesstypeperiod: (data) => instanceQuiet.post('/saas-credit/v1/credit/businesstypeperiod/update', data),
    // ----------------- 业务类型策略 ------------------------------------

    // ----------------- 规则触发策略 ------------------------------------
    // 设置规则触发策略
    createOrUpdateDefault: (data) => instanceQuiet.post('/saas-credit/v1/credit/config/createOrUpdateDefault', data),
    // ----------------- 规则触发策略 ------------------------------------

    // ----------------- 业务规则配置 ------------------------------------
    // 配置业务规则
    createBsOrUpdate: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditbusinessrulesconfig/createOrUpdate', data),
    // 获取业务规则配置
    getBsOrUpdate: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditbusinessrulesconfig/getByOrgId', { params }),
    // 获取规则条件配置
    getCreditbusinessrulescondition: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditbusinessrulescondition/list', { params }),
    // 编辑规则条件配置
    updateCreditbusinessrulescondition: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditbusinessrulescondition/createOrUpdate', data),
    // ----------------- 业务规则配置 ------------------------------------

    // ----------------- 审批材料配置 ------------------------------------
    // 获取审批材料配置
    getCreditmaterialsconfig: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditapprovalmaterialsconfig/page', { params }),
    // 创建审批材料配置
    createCreditmaterialsconfig: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditapprovalmaterialsconfig/create', data),
    // 更新审批材料配置
    updateCreditmaterialsconfig: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditapprovalmaterialsconfig/update', data),
    // 获取场景枚举
    getApprovalMaterialScenario: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditapprovalmaterialsconfig/getApprovalMaterialScenario', { params }),
    // 删除审批材料
    deleteCreditmaterialsconfig: (data) => instanceQuiet.post('/saas-credit/v1/credit/creditapprovalmaterialsconfig/delete', data),
    // ----------------- 审批材料配置 ------------------------------------

  }
}

export default getSaleConfigApis
