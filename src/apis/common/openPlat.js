// 开放平台相关接口
const getOpenApis = (instanceQuiet) => {
  return {
    // --------------------------------------------------三方应用--------------------------------------------------
    // 获取三方列表 /saas-boss/app/list
    getAppList: (params) => instanceQuiet.get('/saas-boss/app/list', { params }),
    // 权限接口列表 /saas-boss/app/apiPermissions
    getPermissions: (params) => instanceQuiet.get('/saas-boss/app/apiPermissions', { params }),
    // 创建第三方 /saas-boss/app/create
    createApp: (data) => instanceQuiet.post('/saas-boss/app/create', data),
    // 删除第三方 /saas-boss/app/delete
    deleteApp: (data) => instanceQuiet.post('/saas-boss/app/delete', data),
    // 更新第三方状态 /saas-boss/app/update
    checkApp: (data) => instanceQuiet.post('/saas-boss/app/update', data),
    // 获取令牌 /saas-boss/app/token
    getToken: (params) => instanceQuiet.get('/saas-boss/app/token', { params }),
    // --------------------------------------------------系统 & 错误日志--------------------------------------------------
    // 获取系统日志列表 /saas-credit/v1/credit/creditapilog/listForView
    getSysTemList: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditapilog/listForView', { params }),
    // 获取系统日志功能模块 /saas-credit/v1/credit/creditapilog/methodFunctionDictList
    getFnMoudles: (params) => instanceQuiet.get('/saas-credit/v1/credit/creditapilog/methodFunctionDictList', { params }),
    // 获取错误日志列表 /saas-boss/v1/boss/errorprocesslog/list
    getErrorList: (params) => instanceQuiet.get('/saas-boss/v1/boss/errorprocesslog/list', { params }),
    // 获取错误处理-还款信息 /saas-credit/v1/credit/errorprocess/kingdeeBalanceSyncErrorInfo
    getPayInfo: (params) => instanceQuiet.get('/saas-credit/v1/credit/errorprocess/kingdeeBalanceSyncErrorInfo', { params }),
    // 处理错误 /saas-boss/v1/boss/errorprocesslog/process
    solveError: (data) => instanceQuiet.post('/saas-boss/v1/boss/errorprocesslog/process', data),
    // --------------------------------------------------钉钉应用配置--------------------------------------------------
    // 获取钉钉应用配置 /saas-boss/dingtalk/config/get
    getDingConfig: (params) => instanceQuiet.get('/saas-boss/dingtalk/config/get', { params }),
    // 设置钉钉应用配置 /saas-boss/dingtalk/config/set
    setDingConfig: (data) => instanceQuiet.post('/saas-boss/dingtalk/config/set', data),

    // 获取字典分类
    getDictCategory: (data) => instanceQuiet.post('/saas-boss/v1/boss/dictcategory/getDictCategoryBizKinds', data), // 创建字典
    getDictListPage: (params) => instanceQuiet.get(`/saas-boss/v1/boss/dict/list/${params.pageNo}/${params.pageSize}`, { params }), // 字典列表分页
    createDict: (data) => instanceQuiet.post('/saas-boss/v1/boss/dict/create', data), // 创建字典
    updateDict: (data) => instanceQuiet.post('/saas-boss/v1/boss/dict/update', data), // 更新字典
    getDictClassify: (params) => instanceQuiet.get(`/saas-boss/v1/boss/dictcategory/list/${params.pageNo}/${params.pageSize}`, { params }), // 查询字典分类
  }
}

export default getOpenApis
